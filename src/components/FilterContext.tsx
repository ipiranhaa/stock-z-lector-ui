import React, { createContext, useContext, ReactNode, useState } from 'react'
import { AvailableIndex } from '../type'

interface FilterParams {
  selectedIndex: AvailableIndex
}

interface FilterParamActions {
  setSelectedIndex: (indexing: AvailableIndex) => void
}

interface Props {
  children: ReactNode
}

const FilterContext = createContext<
  { state: FilterParams; actions: FilterParamActions } | undefined
>(undefined)

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}

const FilterProvider = ({ children }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<AvailableIndex>('SET100')

  const store = {
    state: { selectedIndex },
    actions: {
      setSelectedIndex,
    },
  }

  return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}

export default FilterProvider
