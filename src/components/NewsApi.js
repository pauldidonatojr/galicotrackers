import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ArticleCard = styled.div`
 margin-bottom: 20px;
 border: 1px solid #ccc;
 padding: 20px;
 &:hover {
  cursor: pointer;
 }
`

const ArticleTitle = styled.h3`
 font-size: 1.5rem;
 margin-bottom: 10px;
`

const ArticleContent = styled.p`
 font-size: 1.2rem;
 line-height: 1.5;
 overflow: hidden;
 text-overflow: ellipsis;
 display: -webkit-box;
 -webkit-line-clamp: 8; /* number of lines to show */
 -webkit-box-orient: vertical;
`

const Overlay = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1;
`

const OverlayContent = styled.div`
 position: relative;
 background-color: #fff;
 padding: 20px;
 max-width: 800px;
 max-height: 80vh;
 overflow-y: scroll;
`

function NewsList() {
 const [articles, setArticles] = useState([])
 const [selectedArticle, setSelectedArticle] = useState(null)

 useEffect(() => {
  async function fetchArticles() {
   try {
    const response = await axios.get(
     'https://galiconewsapi.netlify.app/api/newsdata'
    )
    setArticles(response.data)
   } catch (error) {
    console.error(error)
   }
  }
  fetchArticles()
 }, [])

 function handleArticleClick(article) {
  setSelectedArticle(article)
 }

 function handleOverlayClick() {
  setSelectedArticle(null)
 }

 return (
  <div>
   <h2>Latest News Articles</h2>
   {articles.map((article) => (
    <ArticleCard
     key={article.publishedAt}
     onClick={() => handleArticleClick(article)}
    >
     <ArticleTitle>{article.title}</ArticleTitle>
     <ArticleContent>{article.content}</ArticleContent>
    </ArticleCard>
   ))}
   {selectedArticle && (
    <Overlay onClick={handleOverlayClick}>
     <OverlayContent>
      <ArticleTitle>{selectedArticle.title}</ArticleTitle>
      <p>{selectedArticle.content}</p>
     </OverlayContent>
    </Overlay>
   )}
  </div>
 )
}

export default NewsList
