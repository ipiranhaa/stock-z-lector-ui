import React, { useState, useEffect } from 'react'
import { Select, Form, Alert, Slider } from 'antd'

import { AvailableIndex } from '../type'
import {
  defaultSelectedIndex,
  defaultSelectedIndustry,
  defaultSelectedSector,
} from '../settings'
import { IndustryId, industries, sectors, relations } from '../constants/industries'

import { useFilterContext } from './contexts/FilterContext'

const { Option } = Select

interface Props {
  updatedAt: string
  setIsFilterModalShown: (show: boolean) => void
}

const FilterModal = ({ setIsFilterModalShown, updatedAt }: Props) => {
  const { state, actions } = useFilterContext()
  const {
    selectedIndex,
    selectedIndustry,
    selectedSector,
    selectedScore,
    selectedFactorsRate,
  } = state
  const {
    setSelectedIndex,
    setSelectedIndustry,
    setSelectedSector,
    setSelectedScore,
    setSelectedFactorsRate,
  } = actions

  const [newIndex, setNewIndex] = useState(selectedIndex)
  const [newIndustry, setNewIndustry] = useState(selectedIndustry)
  const [newSector, setNewSector] = useState(selectedSector)
  const [newScore, setNewScore] = useState(selectedScore)
  const [newFactorsRate, setNewFactorsRate] = useState(selectedFactorsRate)
  const [availableSector, setAvailableSector] = useState(Object.values(sectors))

  useEffect(() => {
    const industryKeys = Object.keys(industries)
    const industryValues = Object.values(industries)
    const valueIndex = industryValues.indexOf(newIndustry)
    if (valueIndex > -1) {
      const groupKey = industryKeys[valueIndex] as IndustryId
      const displaySectors = relations[groupKey].map((sectorId) => sectors[sectorId])
      setAvailableSector(displaySectors)
    }
  }, [newIndustry])

  const handleIndexSelecting = (values: AvailableIndex[]) => {
    setNewIndex(values)
  }

  const handleIndustrySelecting = (value: string) => {
    setNewIndustry(value)
    setNewSector(defaultSelectedSector)
  }

  const handleSectorSelecting = (value: string) => {
    setNewSector(value)
  }

  const handleScoreSelecting = (values: [number, number]) => {
    setNewScore(values)
  }

  const handleFactorsRateSelecting = (values: [number, number]) => {
    setNewFactorsRate(values)
  }

  const handleSubmit = () => {
    setSelectedIndex(newIndex)
    setSelectedIndustry(newIndustry)
    setSelectedSector(newSector)
    setSelectedScore(newScore)
    setSelectedFactorsRate(newFactorsRate)
    setIsFilterModalShown(false)
  }

  return (
    <>
      <div className="fixed z-50 inset-0 flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
        <div className="relative mx-6 my-6">
          <div className="relative flex flex-col w-full dark:bg-gray-800 bg-white border-0 rounded-lg outline-none shadow-lg">
            <div className="relative flex-auto p-6">
              <Form layout="vertical">
                <Form.Item label="Index">
                  <Select
                    defaultValue={selectedIndex}
                    mode="multiple"
                    onChange={handleIndexSelecting}
                    placeholder="Please select stock index"
                    style={{ width: '100%' }}
                  >
                    {defaultSelectedIndex.map((value, index) => (
                      <Option key={`index-${index}`} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Score">
                  <Slider defaultValue={newScore} max={10} onChange={handleScoreSelecting} range />
                </Form.Item>
                <Form.Item label="Factors rate">
                  <Slider
                    defaultValue={newFactorsRate}
                    onChange={handleFactorsRateSelecting}
                    range
                  />
                </Form.Item>
                <Form.Item label="Industry">
                  <Select
                    onChange={handleIndustrySelecting}
                    placeholder="Please select stock industry"
                    style={{ width: '100%' }}
                    value={newIndustry}
                  >
                    <Option key="industry-all" value={defaultSelectedIndustry}>
                      All
                    </Option>
                    {Object.values(industries).map((value, index) => (
                      <Option key={`industry-${index}`} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Sector">
                  <Select
                    onChange={handleSectorSelecting}
                    placeholder="Please select stock sector"
                    style={{ width: '100%' }}
                    value={newSector}
                  >
                    <Option key="sector-all" value={defaultSelectedSector}>
                      All
                    </Option>
                    {availableSector.map((value, index) => (
                      <Option key={`sector-${index}`} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
              <Alert message={`Updated ${updatedAt}`} showIcon type="info" />
            </div>
            <div className="flex items-center justify-end p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-red-500 text-sm font-bold outline-none uppercase"
                onClick={() => setIsFilterModalShown(false)}
                style={{ transition: 'all .15s ease' }}
                type="button"
              >
                Close
              </button>
              <button
                className="mb-1 mr-1 px-6 py-2 text-white text-sm font-bold bg-green-500 active:bg-green-600 rounded outline-none shadow hover:shadow-lg uppercase"
                onClick={handleSubmit}
                style={{ transition: 'all .15s ease' }}
                type="button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-40 inset-0 bg-black opacity-25" />
    </>
  )
}

export default FilterModal
