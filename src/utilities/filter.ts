import { Stock } from '../api/fetchStockByIndex'
import {  defaultSelectedIndustry, defaultSelectedSector } from '../settings'
import { AvailableIndex } from '../type'

interface Filterer {
  selectedIndex: AvailableIndex[]
  selectedIndustry: string
  selectedSector: string
  selectedScore: [number, number]
  selectedFactorsRate: [number, number]
}

const filter = (stockList: Stock[], filterer: Filterer) => {
  const {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedScore: [startScore, endScore],
    selectedFactorsRate: [startFactorsRate, endFactorsRate],
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
  // ─── FILTER BY INDUSTRY AND SECTOR ──────────────────────────────────────────────
  //

  const isSelectedIndustry = selectedIndustry !== defaultSelectedIndustry
  const isSelectedSector = selectedSector !== defaultSelectedSector

  let filteredByIndustry: Stock[] = []
  if (isSelectedIndustry && isSelectedSector) {
    filteredByIndustry = filteredByIndex.filter(
      ({ industry, sector }) => industry === selectedIndustry && sector === selectedSector
    )
  } else if (isSelectedIndustry) {
    filteredByIndustry = filteredByIndex.filter(({ industry }) => industry === selectedIndustry)
  } else if (isSelectedSector) {
    filteredByIndustry = filteredByIndex.filter(({ sector }) => sector === selectedSector)
  } else {
    filteredByIndustry = filteredByIndex
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
