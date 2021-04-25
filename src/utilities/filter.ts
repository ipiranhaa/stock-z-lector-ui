import { Stock } from '../api/fetchStockByIndex'
import { defaultSelectedAdvice, defaultSelectedIndustry, defaultSelectedSector } from '../settings'
import { AvailableIndex } from '../type'

interface Filterer {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedScore: [number, number]
  selectedFactorsRate: [number, number]
  selectedAdvice: string
}

const filter = (stockList: Stock[], filterer: Filterer) => {
  const {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedScore: [startScore, endScore],
    selectedFactorsRate: [startFactorsRate, endFactorsRate],
    selectedAdvice,
  } = filterer

  //
  // ─── FILTER BY STOCK INDEX ──────────────────────────────────────────────────────
  //

  const filteredByIndex = stockList.filter(({ tags }) => {
    if (selectedIndex.length < tags.length) {
      return tags.some((tag) => selectedIndex.includes(tag))
    }
    return tags.every((tag) => selectedIndex.includes(tag))
  })

  //
  // ─── FILTER BY COMMUNITY ADVICE ─────────────────────────────────────────────────
  //

  const isSelectedAdvice = selectedAdvice !== defaultSelectedAdvice

  let filteredByAdvice = filteredByIndex
  if (isSelectedAdvice) {
    filteredByAdvice = filteredByAdvice.filter(({ advice }) => selectedAdvice === advice)
  }

  const isSelectedIndustry = selectedIndustry !== defaultSelectedIndustry
  const isSelectedSector = selectedSector !== defaultSelectedSector

  //
  // ─── FILTER BY INDUSTRY AND SECTOR ──────────────────────────────────────────────
  //

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

  //
  // ─── FILTER BY SCORE RANGE ──────────────────────────────────────────────────────
  //

  const filteredByScore = filteredByIndustry.filter(
    ({ score }) => score >= startScore && score <= endScore
  )

  //
  // ─── FILTER BY FACTORS RATE RANGE ───────────────────────────────────────────────
  //

  const filteredByFactorsRate = filteredByScore.filter(
    ({ factorPercentage }) =>
      factorPercentage >= startFactorsRate && factorPercentage <= endFactorsRate
  )

  return filteredByFactorsRate
}

export default filter
