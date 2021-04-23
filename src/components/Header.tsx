import React, { ChangeEvent } from 'react'
import { Input } from 'antd'

import FilterIcon from './icons/Filter'
import SortingIcon from './icons/Sorting'

interface Props {
  setSearchKeyword: (keyword: string[]) => void
  setFilterModalShow: (show: boolean) => void
  setSortingModalShow: (show: boolean) => void
}

const Header = ({ setSearchKeyword, setFilterModalShow, setSortingModalShow }: Props) => {
  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value.split(',')
    setSearchKeyword(value)
  }

  return (
    <div className="flex content-between p-4 text-gray-800 text-xs">
      <Input allowClear onChange={handleSearch} placeholder="SEARCH" />
      <button
        className="ml-4 px-4 py-2 text-white text-sm bg-blue-500 active:bg-blue-600 rounded outline-none shadow hover:shadow-lg uppercase"
        onClick={() => setFilterModalShow(true)}
        style={{ transition: 'all .15s ease' }}
        type="button"
      >
        <FilterIcon />
      </button>
      <button
        className="ml-4 px-4 py-2 text-white text-sm bg-blue-500 active:bg-blue-600 rounded outline-none shadow hover:shadow-lg uppercase"
        onClick={() => setSortingModalShow(true)}
        style={{ transition: 'all .15s ease' }}
        type="button"
      >
        <SortingIcon />
      </button>
    </div>
  )
}

export default Header
