import { useState } from 'react'
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
  console.log('selectedIndex', selectedIndex)

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-4 grid-cols-1 bg-gray-100">
        <div className="inline-block mt-2 px-4 text-right text-gray-800 text-xs">
          Updated {set100.createdAt}
          <button
            className="ml-4 px-4 py-2 text-white text-sm font-bold bg-blue-500 active:bg-blue-600 rounded outline-none shadow hover:shadow-lg uppercase"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => setShowModal(true)}
          >
            Filter
          </button>
        </div>
        {set100.results.map((stock) => (
          <StockCard key={stock.id} stock={stock} />
        ))}
      </div>
      {showModal && <FilterModal setShowModal={setShowModal} />}
    </div>
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
