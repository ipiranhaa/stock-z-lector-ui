import React, { createContext, useContext, ReactNode, useState } from 'react'

import {
  defaultSelectedIndex,
  defaultSelectedIndustry,
  defaultSelectedSector,
  defaultSelectedScore,
  defaultSelectedFactorsRate,
  defaultSelectedAdvice,
} from '../../settings'
import { AvailableIndex } from '../../type'

interface FilterParams {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedScore: [number, number]
  selectedFactorsRate: [number, number]
  selectedAdvice: string
}

interface FilterParamActions {
  setSelectedIndex: (indexings: AvailableIndex[]) => void
  setSelectedIndustry: (industry: string) => void
  setSelectedSector: (sector: string) => void
  setSelectedScore: (score: [number, number]) => void
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
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}

const FilterProvider = ({ children }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<AvailableIndex[]>(defaultSelectedIndex)
  const [selectedIndustry, setSelectedIndustry] = useState(defaultSelectedIndustry)
  const [selectedSector, setSelectedSector] = useState(defaultSelectedSector)
  const [selectedScore, setSelectedScore] = useState(defaultSelectedScore)
  const [selectedFactorsRate, setSelectedFactorsRate] = useState(defaultSelectedFactorsRate)
  const [selectedAdvice, setSelectedAdvice] = useState(defaultSelectedAdvice)

  const store = {
    state: {
      selectedIndex,
      selectedIndustry,
      selectedSector,
      selectedScore,
      selectedFactorsRate,
      selectedAdvice,
    },
    actions: {
      setSelectedIndex,
      setSelectedIndustry,
      setSelectedSector,
      setSelectedScore,
      setSelectedFactorsRate,
      setSelectedAdvice,
    },
  }

  return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}

export default FilterProvider
