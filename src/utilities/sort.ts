import { Stock } from '../api/fetchStockByIndex'
import { AvailableSortedBy } from '../type'

const sort = (sortedBy: AvailableSortedBy, stockList: Stock[]) => {
  const stocks = stockList

  switch (sortedBy) {
    case 'P/E':
      stocks.sort((aStock, bStock) => aStock.pe - bStock.pe)
      break

    case 'P/BV':
      stocks.sort((aStock, bStock) => aStock.pbv - bStock.pbv)
      break

    case 'Factors Rate':
      stocks.sort((aStock, bStock) => bStock.factorPercentage - aStock.factorPercentage)
      break

    case 'DVD Yield':
      stocks.sort((aStock, bStock) => bStock.dvdYield - aStock.dvdYield)
      break

    default:
      stocks.sort((aStock, bStock) => bStock.score - aStock.score)
      break
  }

  return stocks
}

export default sort
