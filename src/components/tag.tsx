import React from 'react'

interface Props {
  label: string
}

const Tag = ({ label }: Props) => (
  <span className="bg-gray-200 text-gray-800 mr-2 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
    {label}
  </span>
)

export default Tag
