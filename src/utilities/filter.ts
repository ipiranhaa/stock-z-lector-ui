import { Stock } from '../api/fetchStockByIndex'
import { defaultSelectedAdvice, defaultSelectedIndustry, defaultSelectedSector } from '../settings'
import { AvailableIndex } from '../type'

interface Filterer {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedFactorsRate: [number, number]
  selectedAdvice: string
}

const filter = (stockList: Stock[], filterer: Filterer) => {
  const {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedFactorsRate: [startFactorsRate, endFactorsRate],
    selectedAdvice,
  } = filterer

  // Filter by stock index
  const filteredByIndex = stockList.filter(({ tags }) => {
    if (selectedIndex.length < tags.length) {
      return tags.some((tag) => selectedIndex.includes(tag))
    }
    return tags.every((tag) => selectedIndex.includes(tag))
  })

  // Filter by community advice
  const isSelectedAdvice = selectedAdvice !== defaultSelectedAdvice

  let filteredByAdvice = filteredByIndex
  if (isSelectedAdvice) {
    filteredByAdvice = filteredByAdvice.filter(({ advice }) => selectedAdvice === advice)
  }

  const isSelectedIndustry = selectedIndustry !== defaultSelectedIndustry
  const isSelectedSector = selectedSector !== defaultSelectedSector

  // Filter by industry and sector
  let filteredByIndustry: Stock[] = []
  if (isSelectedIndustry && isSelectedSector) {
    filteredByIndustry = filteredByAdvice.filter(
      ({ industry, sector }) => industry === selectedIndustry && sector === selectedSector
    )
  } else if (isSelectedIndustry) {
    filteredByIndustry = filteredByAdvice.filter(({ industry }) => industry === selectedIndustry)
  } else if (isSelectedSector) {
    filteredByIndustry = filteredByAdvice.filter(({ sector }) => sector === selectedSector)
  } else {
    filteredByIndustry = filteredByAdvice
  }

  // Filter by factors rate
  const filteredByFactorsRate = filteredByIndustry.filter(
    ({ factorPercentage }) =>
      factorPercentage >= startFactorsRate && factorPercentage <= endFactorsRate
  )

  return filteredByFactorsRate
}

export default filter
