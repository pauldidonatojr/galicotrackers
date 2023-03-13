import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const NewsContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
`

const Article = styled.div`
 margin: 20px;
 padding: 20px;
 border: 1px solid gray;
 border-radius: 5px;
 width: 80%;
 max-width: 600px;
`

const Title = styled.h2`
 margin-bottom: 10px;
`

const PublishedAt = styled.p`
 margin-bottom: 5px;
 font-size: 0.8rem;
`

const Content = styled.p`
 margin-top: 10px;
 line-height: 1.5;
`

const News = () => {
 const [articles, setArticles] = useState([])

 useEffect(() => {
  const fetchNews = async () => {
   try {
    const { data } = await axios.get(
     `https://galiconewsapi.netlify.app/api/newsdata`
    )
    setArticles(data)
   } catch (error) {
    console.error(error)
   }
  }

  fetchNews()
 }, [])

 return (
  <NewsContainer>
   {articles.map((article, index) => (
    <Article key={index}>
     <Title>{article.title}</Title>
     <PublishedAt>{article.publishedAt}</PublishedAt>
     <Content>{article.content}</Content>
    </Article>
   ))}
  </NewsContainer>
 )
}

export default News
