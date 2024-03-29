import React from 'react'
import { differenceInDays, isPast, addDays } from 'date-fns'

import { Stock } from '../api/fetchStockByIndex'

import Tag from './Tag'

interface Props {
  stock: Stock
}

const StockCard = ({ stock }: Props) => {
  let dividendIn
  if (stock.dividend.lastDate !== '-' && stock.dividend.predictedDate !== '-') {
    const [lastDividendDay, lastDividendMonth, lastDividendYear] =
      stock.dividend.lastDate.split('/')
    const [predictedDay, predictedMonth, predictedYear] = stock.dividend.predictedDate.split('/')

    const lastDate = new Date(
      Number(lastDividendYear),
      Number(lastDividendMonth) - 1,
      Number(lastDividendDay)
    )
    const predictedDate = new Date(
      Number(predictedYear),
      Number(predictedMonth) - 1,
      Number(predictedDay)
    )
    const todayDate = new Date()

    if (isPast(lastDate)) {
      dividendIn = differenceInDays(predictedDate, addDays(todayDate, 1))
    } else {
      dividendIn = differenceInDays(lastDate, addDays(todayDate, -1))
    }
  }

  return (
    <a
      className="dark:text-gray-300"
      href={`https://www.jitta.com/stock/bkk:${stock.name.toLowerCase()}`}
      rel="noreferrer"
      target="_blank"
    >
      <div className="p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg">
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
            <h4 className="mt-1 dark:text-white text-xl font-bold">{stock.name}</h4>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">฿ {stock.price}</span>
            </div>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">
                P/E {stock.pe || '-'}
              </span>
            </div>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">P/BV {stock.pbv}</span>
            </div>
          </div>
          <div className="pl-4 border-l">
            <h4 className="mt-1 dark:text-white text-xl font-bold">{stock.score}</h4>
            <div className="mt-1 dark:text-gray-300 text-gray-600 text-sm">
              {stock.linePercentage > 0 ? 'Over ' : 'Under '}
              <span
                className={`${
                  stock.linePercentage > 0 ? 'text-red-700 dark:text-red-800' : 'text-green-700'
                }`}
              >
                {stock.linePercentage}%
              </span>
            </div>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">
                {stock.factorPercentage}% Factors Rate
              </span>
            </div>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">
                {stock.dvdYield || '-'}% DVD Yield
              </span>
            </div>
            <div className="mt-1">
              <span className="dark:text-gray-300 text-gray-600 text-sm">
                {stock.lossChance}% Loss Chance
              </span>
            </div>
          </div>
        </div>

        <hr className="my-2" />

        <div className="text-center">
          <span className="text-xs">
            Dividend in{' '}
            <span
              className={`${
                dividendIn !== undefined && dividendIn <= 60 && 'text-green-700 font-bold'
              }`}
            >
              {dividendIn !== undefined ? dividendIn : '-'}
            </span>{' '}
            days
          </span>
        </div>

        <div className="text-center">
          <span className="text-xs">{stock.industry}</span>
          {stock.sector !== '-' && <span className="text-xs"> - {stock.sector}</span>}
        </div>
      </div>
    </a>
  )
}

export default StockCard
