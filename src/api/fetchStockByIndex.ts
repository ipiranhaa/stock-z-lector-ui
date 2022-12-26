import axios, { AxiosResponse } from 'axios'

import { AvailableIndex } from '../type'

interface Dividend {
  lastDate: string
  predictedDate: string
}

interface StockResponse {
  name: string
  price: string
  lossChance: string
  linePercentage: string
  score: number
  factorPercentage: string
  pe: number
  pbv: number
  dvdYield: string
  industry: string
  sector: string
  dividend: {
    lastDate: string
    predictedDate: string
  }
}

interface StockIndexResponse {
  createdAt: string
  results: StockResponse[]
}

export interface Stock {
  id: string
  name: string
  price: number
  lossChance: number
  linePercentage: number
  score: number
  factorPercentage: number
  pe: number
  pbv: number
  dvdYield: number
  industry: string
  sector: string
  tags: AvailableIndex[]
  dividend: Dividend
}

export interface StockIndex {
  createdAt: string
  results: Stock[]
}

const stockModelMapper = (stockResponses: StockResponse[], fetchedIndex: AvailableIndex): Stock[] =>
  stockResponses.map((response, index) => ({
    id: `${fetchedIndex.toLowerCase()}-${index + 1}`,
    name: response.name,
    price: Number(response.price.slice(1)),
    lossChance: Number(response.lossChance.slice(0, -1)),
    linePercentage: Number(response.linePercentage.slice(0, -1).split(',').join('')),
    score: response.score,
    factorPercentage: Number(response.factorPercentage.slice(0, -1)),
    pe: response.pe,
    pbv: response.pbv,
    dvdYield: Number(response.dvdYield.slice(0, -1)),
    industry: response.industry,
    sector: response.sector,
    tags: [],
    dividend: {
      lastDate: response.dividend.lastDate,
      predictedDate: response.dividend.predictedDate,
    },
  }))

const fetchStockByIndex = async (index: AvailableIndex): Promise<StockIndex | undefined> => {
  try {
    const { data }: AxiosResponse<StockIndexResponse> = await axios.get(
      `https://raw.githubusercontent.com/ipiranhaa/stock-z-lector/main/src/indexing/${index}.json`
    )
    console.log(`Fetch ${index} stock.`)
    return {
      createdAt: data.createdAt,
      results: stockModelMapper(data.results, index),
    }
  } catch (error) {
    console.log(error)
  }

  return undefined
}

export default fetchStockByIndex
