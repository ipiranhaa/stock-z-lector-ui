import Head from 'next/head'

import fetchStockByIndex, { StockIndex } from '../src/api/fetchStockByIndex'

interface Props {
  setHD: StockIndex
}

const Home = ({ setHD }: Props) => {
  console.log(setHD)
  return (
    <div>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="gridgrid-cols-1 gap-4">
        <div>updated: {setHD.createdAt}</div>
        {setHD.results.map((stock, index) => (
          <div key={index}>
            {index + 1}: {stock.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const setHDResponse = await fetchStockByIndex('SETHD')
  console.log(setHDResponse)

  if (!setHDResponse) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      setHD: setHDResponse,
    },
  }
}

export default Home
