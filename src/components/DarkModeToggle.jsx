import React from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <span className="toggle-track">
        <span className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`} />
      </span>
      <span className="toggle-label">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}