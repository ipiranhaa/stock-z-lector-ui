import React from 'react'

import { Stock } from '../api/fetchStockByIndex'

import Tag from './Tag'
import ChatIcon from './icons/Chat'

interface Props {
  stock: Stock
}

const StockCard = ({ stock }: Props) => (
  <div className="p-4 bg-white rounded-lg shadow-lg">
    <div className="flex items-baseline justify-between">
      <div>
        {stock.tags.map((tag, index) => (
          <Tag key={index} label={tag} />
        ))}
      </div>
      <div>
        <Tag label={String(stock.id)} />
      </div>
    </div>

    <div className="grid grid-cols-2 mb-2">
      <div>
        <h4 className="mt-1 text-xl font-bold">{stock.name}</h4>
        <div className="mt-1">
          <span className="text-gray-600 text-sm">฿ {stock.price}</span>
        </div>
        <div className="mt-1">
          <span className="text-gray-600 text-sm">P/E {stock.pe || '-'}</span>
        </div>
        <div className="mt-1">
          <span className="text-gray-600 text-sm">P/BV {stock.pbv}</span>
        </div>
        <div className="mt-1">
          <span className="justify-items-center text-gray-600 text-sm">
            <ChatIcon /> {stock.advice || '-'}
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
          <span className="text-gray-600 text-sm">{stock.factorPercentage}% Factors rate</span>
        </div>
        <div className="mt-1">
          <span className="text-gray-600 text-sm">{stock.dvdYield || '-'}% DVD Yield</span>
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
)

export default StockCard
