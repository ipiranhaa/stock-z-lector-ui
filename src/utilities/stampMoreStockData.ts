/* eslint-disable no-param-reassign */
import { Stock } from '../api/fetchStockByIndex'
import { AvailableIndex } from '../type'

export type TagOptions = [AvailableIndex, string[]][]

const stampMoreStockData = (
  stocks: Stock[],
  defaultTags: AvailableIndex[],
  tagOptions: TagOptions
): Stock[] =>
  stocks.map((stock) => {
    const tags = tagOptions.reduce((tagPool, options) => {
      const [stampTag, stockList] = options
      if (stockList.includes(stock.name)) {
        tagPool = [...tagPool, stampTag]
      }
      return tagPool
    }, defaultTags)

    // Manipulate stock tags
    stock.tags = tags

    return stock
  })

export default stampMoreStockData
