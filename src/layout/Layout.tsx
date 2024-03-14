import SideBar from '@components/sidebar'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="relative h-full w-full flex-1 bg-gray-100 p-4 text-black dark:text-white dark:bg-gray-800 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout
