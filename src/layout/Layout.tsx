import React, { useState } from 'react'
import SideBar from '@components/sidebar'
import Menu from '@public/icons/Menu'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  return (
    <div className="flex flex-row h-screen">
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed z-20 lg:relative ${
          isSidebarVisible ? '' : 'hidden lg:block'
        }`}
      >
        <SideBar />
      </div>
      <div className="relative h-full w-full flex-1 bg-gray-100 p-4 text-black dark:text-white dark:bg-gray-800 overflow-y-auto">
        <div className="w-full flex justify-end p-4 lg:hidden">
          <button onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
