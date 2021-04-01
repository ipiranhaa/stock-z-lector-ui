import React, { ChangeEvent } from 'react'
import { Input } from 'antd'

interface Props {
  setSearchKeyword: (keyword: string[]) => void
  setShowModal: (show: boolean) => void
}

const Header = ({ setSearchKeyword, setShowModal }: Props) => {
  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value.split(',')
    setSearchKeyword(value)
  }

  return (
    <div className="flex content-between p-4 text-gray-800 text-xs">
      <Input placeholder="SEARCH" allowClear onChange={handleSearch} />
      <button
        className="ml-4 px-4 py-2 text-white text-sm font-bold bg-blue-500 active:bg-blue-600 rounded outline-none shadow hover:shadow-lg uppercase"
        type="button"
        style={{ transition: 'all .15s ease' }}
        onClick={() => setShowModal(true)}
      >
        Filter
      </button>
    </div>
  )
}

export default Header
