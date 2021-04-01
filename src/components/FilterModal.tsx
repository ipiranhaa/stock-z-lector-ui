import React, { useState } from 'react'
import { Select } from 'antd'
import { AvailableIndex } from '../type'
import { useFilterContext } from './FilterContext'
import { defaultSelectedIndex } from '../settings'

const { Option } = Select

interface Props {
  updatedAt: string
  setShowModal: (show: boolean) => void
}

const FilterModal = ({ setShowModal, updatedAt }: Props) => {
  const { state, actions } = useFilterContext()
  const { selectedIndex } = state
  const { setSelectedIndex } = actions

  const [newIndex, setNewIndex] = useState(selectedIndex)

  const handleIndexSelecting = (values: AvailableIndex[]) => {
    setNewIndex(values)
  }

  const handleSubmit = () => {
    setSelectedIndex(newIndex)
    setShowModal(false)
  }

  return (
    <>
      <div className="fixed z-50 inset-0 flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
        <div className="relative mx-6 my-6">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none shadow-lg">
            <div className="relative flex-auto p-6">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select stock index"
                defaultValue={selectedIndex}
                onChange={handleIndexSelecting}
              >
                {defaultSelectedIndex.map((value, index) => (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
              Updated {updatedAt}
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
