import React from 'react'

interface FilesProps {
  width?: number
  height?: number
  fill?: string
}

const Files: React.FC<FilesProps> = ({ width = 24, height = 24 }) => {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-files"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M15 3v4a1 1 0 001 1h4" />
      <path d="M18 17h-7a2 2 0 01-2-2V5a2 2 0 012-2h4l5 5v7a2 2 0 01-2 2z" />
      <path d="M16 17v2a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2" />
    </svg>
  )
}

export default Files
