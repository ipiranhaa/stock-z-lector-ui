import 'tailwindcss/tailwind.css'
import 'antd/dist/reset.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import FilterProvider from '../src/components/contexts/FilterContext'
import SortingProvider from '../src/components/contexts/SortingContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <FilterProvider>
        <SortingProvider>
          <Component {...pageProps} />
        </SortingProvider>
      </FilterProvider>
    </ThemeProvider>
  )
}

export default MyApp
