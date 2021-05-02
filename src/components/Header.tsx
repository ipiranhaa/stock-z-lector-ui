import React, { ChangeEvent } from 'react'
import { Input } from 'antd'

import FilterIcon from './icons/Filter'
import SortingIcon from './icons/Sorting'
import GithubIcon from './icons/Github'

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
    <div className="flex gap-4 content-between p-4 text-xs">
      <a
        className="dark:text-white"
        href="https://github.com/ipiranhaa/stock-z-lector-ui"
        rel="noreferrer"
        target="_blank"
      >
        <GithubIcon />
      </a>
      <Input allowClear onChange={handleSearch} placeholder="SEARCH" />
      <button
        className="p-2 text-white text-sm bg-blue-500 active:bg-blue-600 dark:bg-gray-800 rounded outline-none shadow hover:shadow-lg uppercase"
        onClick={() => setFilterModalShow(true)}
        style={{ transition: 'all .15s ease' }}
        type="button"
      >
        <FilterIcon />
      </button>
      <button
        className="p-2 text-white text-sm bg-blue-500 active:bg-blue-600 dark:bg-gray-800 rounded outline-none shadow hover:shadow-lg uppercase"
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
