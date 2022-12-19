import { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Empty } from 'antd'

import fetchStockByIndex, { Stock, StockIndex } from '../src/api/fetchStockByIndex'
import StockCard from '../src/components/StockCard'
import Header from '../src/components/Header'
import { useFilterContext } from '../src/components/contexts/FilterContext'
import stampMoreStockData, { TagOptions } from '../src/utilities/stampMoreStockData'
import filter from '../src/utilities/filter'
import { useSortingContext } from '../src/components/contexts/SortingContext'
import sort from '../src/utilities/sort'

const FilterModal = dynamic(() => import('../src/components/FilterModal.dynamic'))
const SortingModal = dynamic(() => import('../src/components/SortingModal.dynamic'))

interface Props {
  allStocks: StockIndex
}

const Home = ({ allStocks: stocks }: Props) => {
  const {
    state: {
      selectedIndex,
      selectedIndustry,
      selectedSector,
      selectedScore,
      selectedFactorsRate,
      selectedAdvice,
    },
  } = useFilterContext()
  const { selectedSortedBy } = useSortingContext()

  const [isFilterModalShown, setIsFilterModalShown] = useState(false)
  const [isSortingModalShown, setIsSortingModalShown] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState([''])
  const [allStocks, setAllStocks] = useState<StockIndex | undefined>()

  useEffect(() => {
    setAllStocks(stocks)
  }, [])
  
  if(!allStocks?.results) return (<h1>Loading...</h1>)

  const filteredStock = filter(allStocks.results, {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedScore,
    selectedFactorsRate,
    selectedAdvice,
  })

  const sortedStock = sort(selectedSortedBy, filteredStock)

  const searchStockList = sortedStock.filter(({ name }) => {
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
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900">
        <Header
          setFilterModalShow={setIsFilterModalShown}
          setSearchKeyword={setSearchKeyword}
          setSortingModalShow={setIsSortingModalShown}
        />
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

        {isFilterModalShown && (
          <FilterModal
            setIsFilterModalShown={setIsFilterModalShown}
            updatedAt={allStocks.createdAt}
          />
        )}

        {isSortingModalShown && <SortingModal setIsSortingModalShown={setIsSortingModalShown} />}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const [set100Response, set50Response, setHDResponse, maiResponse] = await Promise.all([
    fetchStockByIndex('SET100'),
    fetchStockByIndex('SET50'),
    fetchStockByIndex('SETHD'),
    fetchStockByIndex('MAI'),
  ])

  if (!set100Response || !set50Response || !setHDResponse || !maiResponse) {
    return {
      notFound: true,
    }
  }

  const set50StockNameList = set50Response.results.map(({ name }) => name)
  const setHDStockNameList = setHDResponse.results.map(({ name }) => name)
  const maiStockNameList = maiResponse.results.map(({ name }) => name)

  const tagOptions: TagOptions = [
    ['SET50', set50StockNameList],
    ['SETHD', setHDStockNameList],
    ['MAI', maiStockNameList],
  ]

  const set100 = {
    createdAt: set100Response.createdAt,
    results: stampMoreStockData(set100Response.results, ['SET100'], tagOptions),
  }

  const mai = {
    createdAt: maiResponse.createdAt,
    results: stampMoreStockData(maiResponse.results, [], tagOptions),
  }

  const allStocks = {
    createdAt: set100.createdAt,
    results: [...set100.results, ...mai.results].sort((aDetail: Stock, bDetail: Stock) => {
      const aLinePercentage = aDetail.linePercentage
      const bLinePercentage = bDetail.linePercentage

      const aFactorPercentage = aDetail.factorPercentage
      const bFactorPercentage = bDetail.factorPercentage

      return (
        bDetail.score - aDetail.score ||
        aLinePercentage - bLinePercentage ||
        bFactorPercentage - aFactorPercentage
      )
    }),
  }

  return {
    props: {
      allStocks,
      set50StockNameList,
      setHDStockNameList,
    },
  }
}

export default Home
