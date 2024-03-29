import React from 'react'

interface Props {
  width?: number
  height?: number
}

const Settings: React.FC<Props> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-server-cog"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M3 7a3 3 0 013-3h12a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3zM12 20H6a3 3 0 01-3-3v-2a3 3 0 013-3h10.5M16 18a2 2 0 104 0 2 2 0 10-4 0M18 14.5V16M18 20v1.5M21.032 16.25l-1.299.75M16.27 19l-1.3.75M14.97 16.25l1.3.75M19.733 19l1.3.75M7 8v.01M7 16v.01" />
    </svg>
  )
}

export default Settings
