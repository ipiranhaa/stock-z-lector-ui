import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Stock Z-Lector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Be Warned</p>
        <p>You are using Tailwind CSS!</p>
      </div>
    </div>
  )
}
