import { AvailableIndex, AvailableSortedBy } from './type'

//
// ─── FILTER ─────────────────────────────────────────────────────────────────────
//

export const defaultSelectedIndex: AvailableIndex[] = ['SET100', 'SET50', 'SETHD', 'MAI']
export const defaultSelectedIndustry = 'All'
export const defaultSelectedSector = 'All'
export const defaultSelectedScore: [number, number] = [0, 10]
export const defaultSelectedFactorsRate: [number, number] = [0, 100]

//
// ─── SORTING ────────────────────────────────────────────────────────────────────
//

export const defaultSortedBy: AvailableSortedBy = 'Score'
