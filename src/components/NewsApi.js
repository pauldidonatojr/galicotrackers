import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ArticleContainer = styled.div`
 margin-bottom: 20px;
 padding: 20px;
 border: 1px solid gray;
 border-radius: 5px;
`

const ArticleTitle = styled.h3`
 margin-bottom: 10px;
`

const ArticleContent = styled.p`
 margin-bottom: 10px;
 line-height: 1.5;
`

const ReadMoreButton = styled.button`
 background-color: #fff;
 border: 1px solid gray;
 border-radius: 5px;
 padding: 10px;
 cursor: pointer;
`

const Overlay = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
`

const OverlayContent = styled.div`
 background-color: #fff;
 border: 1px solid gray;
 border-radius: 5px;
 padding: 20px;
 max-width: 80%;
 max-height: 80%;
 overflow: auto;
`

function ArticleList() {
 const [articles, setArticles] = useState([])
 const [currentPage, setCurrentPage] = useState(1)
 const [showOverlay, setShowOverlay] = useState(false)
 const [overlayContent, setOverlayContent] = useState('')

 useEffect(() => {
  async function fetchData() {
   const pageSize = 5
   const startIndex = (currentPage - 1) * pageSize
   const url = `https://galiconewsapi.netlify.app/api/newsdata`
   const response = await fetch(url)
   const data = await response.json()
   setArticles(data.articles)
  }
  fetchData()
 }, [currentPage])

 function handlePageChange(newPage) {
  setCurrentPage(newPage)
 }

 function handleReadMoreClick(content) {
  setShowOverlay(true)
  setOverlayContent(content)
 }

 function handleCloseOverlay() {
  setShowOverlay(false)
 }

 return (
  <div>
   <h2>Articles about Philadelphia</h2>
   {articles.map((article) => (
    <ArticleContainer key={article.url}>
     <ArticleTitle>{article.title}</ArticleTitle>
     <ArticleContent>{article.content.slice(0, 100)}...</ArticleContent>
     <ReadMoreButton onClick={() => handleReadMoreClick(article.content)}>
      Read More
     </ReadMoreButton>
    </ArticleContainer>
   ))}
   <div className="pagination">
    {[1, 2, 3, 4, 5].map((page) => (
     <button key={page} onClick={() => handlePageChange(page)}>
      {page}
     </button>
    ))}
   </div>
   {showOverlay && (
    <Overlay onClick={handleCloseOverlay}>
     <OverlayContent onClick={(event) => event.stopPropagation()}>
      <p>{overlayContent}</p>
     </OverlayContent>
    </Overlay>
   )}
  </div>
 )
}

export default ArticleList
