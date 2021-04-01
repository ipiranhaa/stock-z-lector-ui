import 'tailwindcss/tailwind.css'
import 'antd/dist/antd.css'

import type { AppProps } from 'next/app'
import FilterProvider from '../src/components/FilterContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  )
}

export default MyApp
