/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from 'react-router-dom'
import React, { useEffect } from 'react'
import Logo from '/images/airqo.png'
import { toggleDarkMode } from 'src/services/redux/DarkModeSlice'
import { useDispatch, useSelector } from 'src/services/redux/utils'
import Files from 'src/assets/icons/Files'
import Reports from 'src/assets/icons/Reports'
import Settings from 'src/assets/icons/Settings'
import { useLocation } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ReactNode
  LinkText: string
  linkPath: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  LinkText,
  linkPath,
}) => {
  const location = useLocation()

  return (
    <NavLink
      to={linkPath}
      className={({ isActive }) =>
        `flex items-center space-x-2 w-full p-2 rounded transition-all duration-300 ${
          isActive || (location.pathname === '/view' && linkPath === '/')
            ? 'bg-gray-800'
            : ''
        }`
      }
    >
      {icon}
      <p>{LinkText}</p>
    </NavLink>
  )
}

const Index: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const darkMode = useSelector((state) => state.darkMode.darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <div className="h-screen">
      <div className="w-64 h-full bg-[#145dff] text-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-4 flex justify-between items-center">
            <NavLink
              to="/"
              className="block mb-2 flex space-x-2 items-center justify-start w-full"
            >
              <img
                src={Logo}
                alt="AQ_Report logo"
                className="w-14 h-14 mx-auto rounded-full"
              />
              <p className="text-left w-full text-lg font-semibold">
                AQ Report
              </p>
            </NavLink>
            <button
              onClick={handleToggleDarkMode}
              className="h-12 w-12 rounded-full p-2"
            >
              <svg
                className="fill-white hidden dark:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                className="fill-yellow-300 block dark:hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <hr />
          <div className="space-y-2 p-4">
            <SidebarItem
              icon={<Reports />}
              linkPath="/"
              LinkText="Report Generator"
            />
            <SidebarItem
              icon={<Files />}
              linkPath="/files"
              LinkText="Saved Files"
            />
            <SidebarItem
              icon={<Settings />}
              linkPath="/settings"
              LinkText="Settings"
            />
          </div>
        </div>
        {/* trademark and poweredby */}
        <div
          className="text-center text-white
         text-sm p-4"
        >
          <p>© {currentYear} AQ Report</p>
          <small>Powered by AirQo</small>
        </div>
      </div>
    </div>
  )
}

export default Index
