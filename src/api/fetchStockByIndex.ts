import axios, { AxiosResponse } from 'axios'

interface StockResponse {
  name: string
  price: string
  lossChance: string
  linePercentage: string
  score: number
  factorPercentage: string
  pe: number | null
  advice: string
  industry: string
  sector: string
}

interface StockIndexResponse {
  createdAt: string
  results: StockResponse[]
}

export interface Stock {
  name: string
  price: number
  lossChance: number
  linePercentage: number
  score: number
  factorPercentage: number
  pe: number | '-'
  advice: string
  industry: string
  sector: string
}

export interface StockIndex {
  createdAt: string
  results: Stock[]
}

const stockModelMapper = (stockResponses: StockResponse[]): Stock[] =>
  stockResponses.map((response) => ({
    name: response.name,
    price: Number(response.price.slice(1)),
    lossChance: Number(response.lossChance.slice(0, -1)),
    linePercentage: Number(response.linePercentage.slice(0, -1).split(',').join('')),
    score: response.score,
    factorPercentage: Number(response.factorPercentage.slice(0, -1)),
    pe: response.pe ?? '-',
    advice: response.advice,
    industry: response.industry,
    sector: response.sector,
  }))

const fetchStockByIndex = async (
  index: 'SET50' | 'SET100' | 'SETHD'
): Promise<StockIndex | undefined> => {
  try {
    const { data }: AxiosResponse<StockIndexResponse> = await axios.get(
      `https://raw.githubusercontent.com/ipiranhaa/stock-z-lector/main/src/indexing/${index}.json`
    )
    console.log(`Fetch ${index} stock.`)
    return {
      createdAt: data.createdAt,
      results: stockModelMapper(data.results),
    }
  } catch (error) {
    console.log(error)
  }
}

export default fetchStockByIndex
