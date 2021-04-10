import React, { createContext, useContext, ReactNode, useState } from 'react'

import {
  defaultSelectedIndex,
  defaultSelectedIndustry,
  defaultSelectedSector,
  defaultSelectedFactorsRate,
  defaultSelectedAdvice,
} from '../settings'
import { AvailableIndex } from '../type'

interface FilterParams {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedFactorsRate: [number, number]
  selectedAdvice: string
}

interface FilterParamActions {
  setSelectedIndex: (indexings: AvailableIndex[]) => void
  setSelectedIndustry: (industry: string) => void
  setSelectedSector: (sector: string) => void
  setSelectedFactorsRate: (factorsRate: [number, number]) => void
  setSelectedAdvice: (sector: string) => void
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
  const [selectedAdvice, setSelectedAdvice] = useState(defaultSelectedAdvice)

  const store = {
    state: { selectedIndex, selectedIndustry, selectedSector, selectedFactorsRate, selectedAdvice },
    actions: {
      setSelectedIndex,
      setSelectedIndustry,
      setSelectedSector,
      setSelectedFactorsRate,
      setSelectedAdvice,
    },
  }

  return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}

export default FilterProvider
