import React, { createContext, useContext, ReactNode, useState } from 'react'

import { defaultSortedBy } from '../../settings'
import { AvailableSortedBy } from '../../type'

interface Props {
  children: ReactNode
}

const SortingContext = createContext<
  | {
      selectedSortedBy: AvailableSortedBy
      setSelectedSortedBy: (sortedBy: AvailableSortedBy) => void
    }
  | undefined
>(undefined)

export const useSortingContext = () => {
  const context = useContext(SortingContext)
  if (!context) {
    throw new Error('useSortingContext must be used within a SortingProvider')
  }
  return context
}

const SortingProvider = ({ children }: Props) => {
  const [selectedSortedBy, setSelectedSortedBy] = useState<AvailableSortedBy>(defaultSortedBy)

  const store = {
    selectedSortedBy,
    setSelectedSortedBy,
  }

  return <SortingContext.Provider value={store}>{children}</SortingContext.Provider>
}

export default SortingProvider
