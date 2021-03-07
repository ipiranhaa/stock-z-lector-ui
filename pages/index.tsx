import Head from 'next/head'

import fetchStockByIndex, { StockIndex } from '../src/api/fetchStockByIndex'
import StockCard from '../src/components/stockCard'

interface Props {
  set100: StockIndex
}

const Home = ({ set100 }: Props) => {
  return (
    <div>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-4 grid-cols-1 bg-gray-100">
        <div>updated: {set100.createdAt}</div>
        {set100.results.map((stock, index) => (
          <StockCard key={index} stock={stock} tags={['SET100']} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const set100Response = await fetchStockByIndex('SET100')

  if (!set100Response) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      set100: set100Response,
    },
  }
}

export default Home
