import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const TickerPrices = () => {
 const [prices, setPrices] = useState({})
 const symbols = [
  'OP-USDT',
  'BTC-USDT',
  'APT-USDT',
  'FXS-USDT',
  'MKR-USDT',
  'USDC-USDT',
  'MASK-USDT',
  'FTM-USDT',
  'ETH-USDT',
 ]
 const [refreshKey, setRefreshKey] = useState(Date.now())

 useEffect(() => {
  const fetchPrices = async () => {
   const newPrices = { ...prices }

   for (const symbol of symbols) {
    const response = await axios.get(
     `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`
    )
    const data = response.data.data
    const price = parseFloat(data.price)

    if (!newPrices[symbol]) {
     newPrices[symbol] = {
      currentPrice: price,
      previousPrice: null,
      change: null,
     }
    } else {
     newPrices[symbol].previousPrice = newPrices[symbol].currentPrice
     newPrices[symbol].currentPrice = price
     newPrices[symbol].change = (
      ((price - newPrices[symbol].previousPrice) /
       newPrices[symbol].previousPrice) *
      100
     ).toFixed(2)
    }
   }

   setPrices(newPrices)
   setRefreshKey(Date.now())
  }

  const interval = setInterval(fetchPrices, 10000)

  return () => clearInterval(interval)
 }, [prices, symbols])

 return (
  <Wrapper key={refreshKey}>
   <h1> Watch List </h1>
   <table>
    <thead>
     <tr>
      <th>Symbol</th>
      <th>Price</th>
      <th>Previous Price</th>
      <th>% Change</th>
     </tr>
    </thead>
    <tbody>
     {symbols.map((symbol) => (
      <tr key={symbol}>
       <td>{symbol}</td>
       <td>{prices[symbol]?.currentPrice?.toFixed(6)}</td>
       <td>{prices[symbol]?.previousPrice?.toFixed(6)}</td>
       <td>{prices[symbol]?.change}%</td>
      </tr>
     ))}
    </tbody>
   </table>
  </Wrapper>
 )
}

const Wrapper = styled.div`
 table {
  border-collapse: collapse;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  font-size: 14px;
 }

 th,
 td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
 }

 th {
  background-color: #eee;
  font-weight: bold;
 }

 tr:nth-child(even) {
  background-color: #f2f2f2;
 }

 tr:hover {
  background-color: #ddd;
 }
`

export default TickerPrices
