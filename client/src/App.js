import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { MenuProvider } from './context/MenuContext'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './components/layout/Layout'
import Header from './features/Header/Header'
import {
	ThemeContext,
	ToggleThemeProvider,
} from './context/ToggleThemeProvider'

function App() {
	const { currentTheme } = useContext(ThemeContext)


	return (
		<ThemeProvider theme={currentTheme}>
			<GlobalStyles />
        <Header />
        <Layout />
		</ThemeProvider>
	)
}

export default function Root() {
  return (
    <ToggleThemeProvider>
      <MenuProvider>
			  <App />
      </MenuProvider>
		</ToggleThemeProvider>
	)
}
