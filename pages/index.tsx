import Head from 'next/head'

import fetchStockByIndex, { StockIndex } from '../src/api/fetchStockByIndex'
import StockCard from '../src/components/StockCard'

interface Props {
  set100: StockIndex
  set50StockNameList: string[]
  setHDStockNameList: string[]
}

const Home = ({ set100, set50StockNameList, setHDStockNameList }: Props) => {
  const getStockTags = (name: string) =>
    [
      'SET100',
      set50StockNameList.includes(name) ? 'SET50' : '',
      setHDStockNameList.includes(name) ? 'SETHD' : '',
    ].filter((name) => name)

  return (
    <div>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-4 grid-cols-1 bg-gray-100">
        <div className="inline-block mt-2 px-4 text-right text-gray-800 text-xs">
          Updated {set100.createdAt}
        </div>
        {set100.results.map((stock, index) => (
          <StockCard key={index} stock={stock} tags={getStockTags(stock.name)} order={index + 1} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const set100Response = await fetchStockByIndex('SET100')
  const set50Response = await fetchStockByIndex('SET50')
  const setHDResponse = await fetchStockByIndex('SETHD')

  const set50StockNameList = set50Response?.results.map(({ name }) => name)
  const setHDStockNameList = setHDResponse?.results.map(({ name }) => name)

  if (!set100Response) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      set100: set100Response,
      set50StockNameList,
      setHDStockNameList,
    },
  }
}

export default Home
