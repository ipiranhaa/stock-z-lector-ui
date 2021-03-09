import React from 'react'
import { Stock } from '../api/fetchStockByIndex'
import Tag from './tag'

interface Props {
  stock: Stock
  tags: string[]
}

const StockCard = ({ stock, tags }: Props) => {
  return (
    <div className="px-4">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-baseline">
          {tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <h4 className="mt-1 text-xl font-bold">{stock.name}</h4>
            <div className="mt-1">
              <span className="text-gray-600 text-sm">฿ {stock.price}</span>
            </div>
            <div className="mt-1">
              <span className="text-gray-600 text-sm">PE {stock.pe}</span>
            </div>
            <div className="mt-1">
              <span className="justify-items-center text-gray-600 text-sm">
                <svg
                  className="inline-block"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>{' '}
                {stock.advice}
              </span>
            </div>
          </div>
          <div className="pl-4 border-l">
            <h4 className="mt-1 text-xl font-bold">{stock.score}</h4>
            <div className="mt-1 text-gray-600 text-sm">
              {stock.linePercentage > 0 ? 'Over ' : 'Under '}
              <span className={`${stock.linePercentage > 0 ? 'text-red-700' : 'text-green-700'}`}>
                {stock.linePercentage}%
              </span>
            </div>
            <div className="mt-1">
              <span className="text-gray-600 text-sm">{stock.factorPercentage}% Factor</span>
            </div>

            <div className="mt-1">
              <span className="text-gray-600 text-sm">{stock.lossChance}% Loss chance</span>
            </div>
          </div>
        </div>

        <hr className="my-2" />

        <div className="text-center">
          <span className="text-xs">{stock.industry}</span>
          <span className="text-xs"> - </span>
          <span className="text-xs">{stock.sector}</span>
        </div>
      </div>
    </div>
  )
}

export default StockCard
