import React, { createContext, useContext, ReactNode, useState } from 'react'

import { defaultSelectedIndex, defaultSelectedIndustry, defaultSelectedSector } from '../settings'
import { AvailableIndex } from '../type'

interface FilterParams {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
}

interface FilterParamActions {
  setSelectedIndex: (indexings: AvailableIndex[]) => void
  setSelectedIndustry: (industry: string) => void
  setSelectedSector: (sector: string) => void
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
  const [selectedIndex, setSelectedIndex] = useState<AvailableIndex[]>(defaultSelectedIndex)
  const [selectedIndustry, setSelectedIndustry] = useState(defaultSelectedIndustry)
  const [selectedSector, setSelectedSector] = useState(defaultSelectedSector)

  const store = {
    state: { selectedIndex, selectedIndustry, selectedSector },
    actions: {
      setSelectedIndex,
      setSelectedIndustry,
      setSelectedSector,
    },
  }

  return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}

export default FilterProvider
