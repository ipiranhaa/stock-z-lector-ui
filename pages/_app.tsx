import 'tailwindcss/tailwind.css'
import 'antd/dist/antd.css'

import type { AppProps } from 'next/app'

import FilterProvider from '../src/components/contexts/FilterContext'
import SortingProvider from '../src/components/contexts/SortingContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <SortingProvider>
        <Component {...pageProps} />
      </SortingProvider>
    </FilterProvider>
  )
}

export default MyApp
