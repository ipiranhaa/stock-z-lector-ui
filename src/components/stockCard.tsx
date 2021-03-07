import React from 'react'
import { Stock } from '../api/fetchStockByIndex'
import Tag from './tag'

interface Props {
  stock: Stock
  tags: string[]
}

const StockCard = ({ stock, tags }: Props) => {
  return (
    <div className="relative mb-2 px-4">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-baseline">
          {tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>

        <h4 className="mt-1 text-xl font-bold truncate">{stock.name}</h4>

        <div className="mt-1">
          <span className="text-gray-600 text-sm">฿ </span>
          {stock.price}
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">PE </span>
          {stock.pe}
        </div>
        <hr />
        <div className="mt-2">
          <span className="text-md">{stock.industry}</span>
          <span className="text-md"> - </span>
          <span className="text-md">{stock.sector}</span>
        </div>
      </div>
    </div>
  )
}

export default StockCard
