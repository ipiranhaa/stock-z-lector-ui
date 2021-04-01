import { useState, ChangeEvent } from 'react'
import Head from 'next/head'

import fetchStockByIndex, { StockIndex } from '../src/api/fetchStockByIndex'
import StockCard from '../src/components/StockCard'
import FilterModal from '../src/components/FilterModal'
import { useFilterContext } from '../src/components/FilterContext'
import stampMoreStockData, { TagOptions } from '../src/utilities/stampMoreStockData'

interface Props {
  set100: StockIndex
  set50StockNameList: string[]
  setHDStockNameList: string[]
}

const Home = ({ set100 }: Props) => {
  const {
    state: { selectedIndex },
  } = useFilterContext()
  const [showModal, setShowModal] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState([''])

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value.split(',')
    setSearchKeyword(value)
  }

  const filterStockList = set100.results.filter(({ tags }) => {
    if (selectedIndex.length < tags.length) {
      return tags.some((tag) => selectedIndex.includes(tag))
    }
    return tags.every((tag) => selectedIndex.includes(tag))
  })

  console.log(filterStockList)

  const searchStockList = filterStockList.filter(({ name }) => {
    for (let index = 0; index < searchKeyword.length; index++) {
      if (name.toLowerCase().includes(searchKeyword[index].toLowerCase())) {
        return true
      }
    }
    return false
  })

  return (
    <>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="flex content-between p-4 text-gray-800 text-xs">
          <input
            className="text-md flex flex-grow px-4 py-2 text-right rounded"
            type="text"
            placeholder="SEARCH"
            onChange={handleSearch}
          />
          <button
            className="ml-4 px-4 py-2 text-white text-sm font-bold bg-blue-500 active:bg-blue-600 rounded outline-none shadow hover:shadow-lg uppercase"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => setShowModal(true)}
          >
            Filter
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1">
          {searchStockList.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
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
