import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme'
import GlobalStyles from './styles/GlobalStyles'
import Home from './features/Home/Home'
import Header from './features/Header/Header'
import Subreddits from './features/Subreddits/Subreddits'

function App() {
	const [currentTheme, setCurrentTheme] = useState(theme.lightTheme)
	const [isSidebarVisible, setIsSidebarVisible] = useState(false)

	const desktop = window.matchMedia('(min-width: 1199px)').matches
	const tablet = window.matchMedia('(max-width: 768px)').matches

	const toggleTheme = () => {
		setCurrentTheme(
			currentTheme === theme.lightTheme
				? theme.darkTheme
				: theme.lightTheme
		)
	}

	const toggleAside = () => {
		setIsSidebarVisible(!isSidebarVisible)
	}

	return (
		<>
			<ThemeProvider theme={currentTheme}>
				<GlobalStyles />
				<Header
					tablet={tablet}
					currentTheme={currentTheme.name}
					toggleTheme={toggleTheme}
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
		</>
	)
}

export default App

const Layout = styled.div`
	display: flex;
	gap: 20px;
	padding-top: 5rem; /* Adjust to account for fixed header height */
`

const Sidebar = styled.aside`
	background: ${({ theme }) => theme.colors.background};
	border-right: 1px solid ${({ theme }) => theme.colors.border};
	padding: 2rem;
	position: fixed;
	top: 5.1rem; /* Adjust to account for fixed header height */
	left: 0;
  width: 30rem;
	height: calc(100% - 5rem); /* Adjust to account for fixed header height */
	overflow-y: auto;
	transition: transform 0.3s ease-in-out;
	transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});

	@media (max-width: 1199px) {
		transform: translateX(
			${({ $isVisible }) => ($isVisible ? '0' : '-100%')}
		);
	}

	@media (min-width: 1200px) {
		transform: translateX(0); /* Always visible on larger screens */
	}
`

const Main = styled.main`
	flex: 1;
	margin-left: 20rem; /* Space for the sidebar */
	padding: 2rem;
	max-width: 100%;
	@media (max-width: 1199px) {
		margin-left: 0; /* No space when sidebar is hidden */
	}
	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}
`
