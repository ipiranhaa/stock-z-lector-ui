import { useState } from 'react'
import Head from 'next/head'
import { Empty } from 'antd'

import fetchStockByIndex, { StockIndex } from '../src/api/fetchStockByIndex'
import StockCard from '../src/components/StockCard'
import FilterModal from '../src/components/FilterModal'
import Header from '../src/components/Header'
import { useFilterContext } from '../src/components/FilterContext'
import stampMoreStockData, { TagOptions } from '../src/utilities/stampMoreStockData'
import filter from '../src/utilities/filter'

interface Props {
  set100: StockIndex
}

const Home = ({ set100 }: Props) => {
  const {
    state: { selectedIndex, selectedIndustry, selectedSector, selectedFactorsRate, selectedAdvice },
  } = useFilterContext()
  const [showModal, setShowModal] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState([''])

  const filteredStock = filter(set100.results, {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedFactorsRate,
    selectedAdvice,
  })

  const searchStockList = filteredStock.filter(({ name }) => {
    for (let index = 0; index < searchKeyword.length; index++) {
      if (name.toLowerCase().includes(searchKeyword[index].toLowerCase())) {
        return true
      }
    }
    return false
  })

  const haveFilteredStocks = searchStockList.length

  return (
    <>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Header setShowModal={setShowModal} setSearchKeyword={setSearchKeyword} />
        <div
          className={`grid gap-4 pb-4 px-4 sm:grid-cols-1 ${
            haveFilteredStocks ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1 lg:grid-cols-1'
          }`}
        >
          {haveFilteredStocks ? (
            searchStockList.map((stock) => <StockCard key={stock.id} stock={stock} />)
          ) : (
            <Empty />
          )}
        </div>
        {showModal && <FilterModal setShowModal={setShowModal} updatedAt={set100.createdAt} />}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const set100Response = await fetchStockByIndex('SET100')
  const set50Response = await fetchStockByIndex('SET50')
  const setHDResponse = await fetchStockByIndex('SETHD')

  if (!set100Response || !set50Response || !setHDResponse) {
    return {
      notFound: true,
    }
  }

  const set50StockNameList = set50Response.results.map(({ name }) => name)
  const setHDStockNameList = setHDResponse.results.map(({ name }) => name)

  const tagOptions: TagOptions = [
    ['SET50', set50StockNameList],
    ['SETHD', setHDStockNameList],
  ]

  const set100 = {
    createdAt: set100Response.createdAt,
    results: stampMoreStockData(set100Response.results, ['SET100'], tagOptions),
  }

  return {
    props: {
      set100,
      set50StockNameList,
      setHDStockNameList,
    },
  }
}

export default Home
