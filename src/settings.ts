import { AvailableIndex, AvailableSortedBy } from './type'

//
// ─── FILTER ─────────────────────────────────────────────────────────────────────
//

export const defaultSelectedIndex: AvailableIndex[] = ['SET100', 'SET50', 'SETHD', 'MAI']
export const defaultSelectedIndustry = 'All'
export const defaultSelectedSector = 'All'
export const defaultSelectedFactorsRate: [number, number] = [0, 100]
export const defaultSelectedAdvice = 'All'

//
// ─── SORTING ────────────────────────────────────────────────────────────────────
//

export const defaultSortedBy: AvailableSortedBy = 'Score'
