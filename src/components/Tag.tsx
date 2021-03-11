import React from 'react'

interface Props {
  label: string
}

const Tag = ({ label }: Props) => (
  <span className="inline-block mr-2 px-2 text-gray-800 text-xs font-semibold tracking-wide bg-gray-200 rounded-full uppercase">
    {label}
  </span>
)

export default Tag
