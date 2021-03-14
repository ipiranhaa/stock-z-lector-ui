import React, { ChangeEvent, useState } from 'react'
import { AvailableIndex } from '../type'
import { useFilterContext } from './FilterContext'

interface Props {
  setShowModal: (show: boolean) => void
}

const FilterModal = ({ setShowModal }: Props) => {
  const { state, actions } = useFilterContext()
  const { selectedIndex } = state
  const { setSelectedIndex } = actions

  const [newIndex, setNewIndex] = useState(selectedIndex)

  const handleIndexSelecting = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setNewIndex(target.value as AvailableIndex)
  }

  const handleSubmit = () => {
    setSelectedIndex(newIndex)
    setShowModal(false)
  }

  return (
    <>
      <div className="fixed z-50 inset-0 flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
        <div className="relative mx-auto my-6 w-auto max-w-6xl">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none shadow-lg">
            <div className="relative flex-auto p-6">
              <select
                className="round-md px-2 w-full h-8 border rounded"
                onChange={handleIndexSelecting}
              >
                <option value="SET100" selected={newIndex === 'SET100'}>
                  SET100
                </option>
                <option value="SET50" selected={newIndex === 'SET50'}>
                  SET50
                </option>
                <option value="SETHD" selected={newIndex === 'SETHD'}>
                  SETHD
                </option>
              </select>
            </div>

            <div className="flex items-center justify-end p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-red-500 text-sm font-bold outline-none uppercase"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="mb-1 mr-1 px-6 py-2 text-white text-sm font-bold bg-green-500 active:bg-green-600 rounded outline-none shadow hover:shadow-lg uppercase"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-40 inset-0 bg-black opacity-25"></div>
    </>
  )
}

export default FilterModal
