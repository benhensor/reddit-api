import { useContext, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Home from './features/Home/Home'
import Header from './features/Header/Header'
import Subreddits from './features/Subreddits/Subreddits'
import { ThemeContext, ToggleThemeProvider } from './context/ToggleThemeProvider'

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const toggleAside = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  // Consume the theme context
  const { currentTheme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Header
        toggleAside={toggleAside}
        isSidebarVisible={isSidebarVisible}
      />
      <Layout>
        <Sidebar $isVisible={isSidebarVisible}>
          <Subreddits />
        </Sidebar>
        <Main>
          <Home />
        </Main>
      </Layout>
    </ThemeProvider>
  )
}

export default function Root() {
  return (
    <ToggleThemeProvider>
      <App />
    </ToggleThemeProvider>
  )
}

const Layout = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 5rem;
`

const Sidebar = styled.aside`
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  position: fixed;
  top: 5.1rem;
  left: 0;
  width: 30rem;
  height: calc(100% - 5rem);
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
  @media (max-width: 1199px) {
    transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
  }
  @media (min-width: 1200px) {
    transform: translateX(0);
  }
`

const Main = styled.main`
  flex: 1;
  margin-left: 20rem;
  padding: 2rem;
  max-width: 100%;
  @media (max-width: 1199px) {
    margin-left: 0;
  }
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`
