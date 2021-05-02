import React from 'react'

import { AvailableSortedBy } from '../type'
import sortingChoices from '../constants/sorting'

import { useSortingContext } from './contexts/SortingContext'

interface Props {
  setIsSortingModalShown: (show: boolean) => void
}

const FilterModal = ({ setIsSortingModalShown }: Props) => {
  const { selectedSortedBy, setSelectedSortedBy } = useSortingContext()

  const handleSubmitSortedBy = (sortedBy: AvailableSortedBy) => {
    setSelectedSortedBy(sortedBy)
    setIsSortingModalShown(false)
  }

  return (
    <>
      <div className="fixed z-50 inset-0 flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
        <div className="relative mx-6 my-6">
          <div className="relative flex flex-col w-full dark:bg-gray-800 bg-white border-0 rounded-lg outline-none shadow-lg">
            <div className="relative flex-auto px-10 py-6 w-72">
              <ul className="w-full divide-gray-200 divide-y">
                {sortingChoices.map((sortedBy, index) => (
                  <li
                    key={index}
                    className={`flex items-center h-8 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 cursor-pointer ${
                      selectedSortedBy === sortedBy && 'font-bold'
                    }`}
                    onClick={(event) => {
                      event.stopPropagation()
                      handleSubmitSortedBy(sortedBy)
                    }}
                  >
                    {sortedBy}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 text-white text-sm font-bold bg-red-500 active:bg-red-600 rounded outline-none shadow hover:shadow-lg uppercase"
                  onClick={() => setIsSortingModalShown(false)}
                  style={{ transition: 'all .15s ease' }}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed z-40 inset-0 bg-black opacity-25"
        onClick={() => setIsSortingModalShown(false)}
      />
    </>
  )
}

export default FilterModal
