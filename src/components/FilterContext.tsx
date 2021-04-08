import React, { createContext, useContext, ReactNode, useState } from 'react'

import {
  defaultSelectedIndex,
  defaultSelectedIndustry,
  defaultSelectedSector,
  defaultSelectedFactorsRate,
} from '../settings'
import { AvailableIndex } from '../type'

interface FilterParams {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedFactorsRate: [number, number]
}

interface FilterParamActions {
  setSelectedIndex: (indexings: AvailableIndex[]) => void
  setSelectedIndustry: (industry: string) => void
  setSelectedSector: (sector: string) => void
  setSelectedFactorsRate: (factorsRate: [number, number]) => void
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
  const [selectedFactorsRate, setSelectedFactorsRate] = useState(defaultSelectedFactorsRate)

  const store = {
    state: { selectedIndex, selectedIndustry, selectedSector, selectedFactorsRate },
    actions: {
      setSelectedIndex,
      setSelectedIndustry,
      setSelectedSector,
      setSelectedFactorsRate,
    },
  }

  return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}

export default FilterProvider
