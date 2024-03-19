import React, { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  backgroundColor: string
  icon?: ReactNode
  text: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  icon,
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor,
      }}
      className="text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 m-2 hover:shadow-lg"
    >
      {icon && <span>{icon}</span>}
      <span className="hidden md:inline">{text}</span>
    </button>
  )
}
