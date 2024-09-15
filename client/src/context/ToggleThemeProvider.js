import React, { createContext, useState, useEffect } from 'react'
import { theme } from '../styles/Theme'

// Create the context
export const ThemeContext = createContext()

export const ToggleThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') === 'dark' ? theme.darkTheme : theme.lightTheme)
  const [switchState, setSwitchState] = useState(true)

  useEffect(() => {
    localStorage.setItem('theme', currentTheme.name) // Store theme name
  }, [currentTheme])

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === theme.lightTheme ? theme.darkTheme : theme.lightTheme
      return newTheme
    })
    setSwitchState(prevState => !prevState)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, switchState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
