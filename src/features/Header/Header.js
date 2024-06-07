import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '../../components/Icons/MenuIcon'
import LogoFace from '../../components/Icons/LogoFace'
import LogoText from '../../components/Icons/LogoText'
import SearchIcon from '../../components/Icons/SearchIcon'
import UserControls from './UserControls'
import MobileMenu from './MobileMenu'
import { setSearchTerm } from '../../store/redditSlice'
import { getProfileStyle } from '../../utils/getProfileStyle'

export default function Header({
	currentTheme,
	toggleTheme,
	toggleAside,
	setIsSidebarVisible,
}) {
	const dispatch = useDispatch()

	const [searchTermLocal, setSearchTermLocal] = useState('')
	const searchTerm = useSelector((state) => state.reddit.searchTerm)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isTabletView, setIsTabletView] = useState(window.innerWidth <= 768)
	const profileStyle = useMemo(() => getProfileStyle(), [])
	

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) setIsMobileMenuOpen(false)
			setIsTabletView(window.innerWidth <= 768)
		}

		window.addEventListener('resize', handleResize)

		// Clean up the event listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const onSearchTermChange = (e) => {
		setSearchTermLocal(e.target.value)
	}

	useEffect(() => {
		setSearchTermLocal(searchTerm)
	}, [searchTerm])

	const onSearchTermSubmit = (e) => {
		e.preventDefault()
		dispatch(setSearchTerm(searchTermLocal))
	}

	return (
		<StyledHeader>
			<Logo>
				<MenuIcon
					onClick={toggleAside}
					isAsideVisible={setIsSidebarVisible}
				/>
				<LogoFace />
				<LogoText />
			</Logo>
			<Search>
				<label htmlFor="search"></label>
				<SearchIcon />
				<span>
					<input
						type="text"
						id="search"
						placeholder="Search Reddit"
						value={searchTermLocal}
						onChange={onSearchTermChange}
						aria-label="Search Posts"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onSearchTermSubmit(e)
							}
						}}
					/>
				</span>
			</Search>
			<UserControls
				profileStyle={profileStyle}
				isTabletView={isTabletView}
				toggleTheme={toggleTheme}
				handleMobileMenu={handleMobileMenu}
			/>
			{isMobileMenuOpen && (
				<MobileMenuContainer $isVisible={isMobileMenuOpen}>
					<MobileMenu
						profileStyle={profileStyle}
						currentTheme={currentTheme}
						toggleTheme={toggleTheme}
						username={null}
					/>
				</MobileMenuContainer>
			)}
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 1000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	background: ${({ theme }) => theme.colors.background};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	@media only screen and (max-width: 768px) {
		padding: 0.5rem 1rem;
	}
`

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	cursor: pointer;
`

const Search = styled.div`
	flex: 1 1 0%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 60rem;
	border-radius: 2rem;
	background-color: ${({ theme }) => theme.colors.searchBarBackground};
	margin: 0 3rem;
	&:hover {
		background-color: ${({ theme }) =>
			theme.colors.searchBarBackgroundHover};
	}
	label {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transform: translateY(0);
		transition: transform 150ms ease 0s;
		width: 100%;
		padding: 1rem 0;
	}
	input {
		width: calc(100% - 8rem);
		background-color: transparent;
		border: 1px solid var(--color-grey-3);
		font-size: 1.4rem;
		color: ${({ theme }) => theme.colors.searchBarText};
		text-overflow: ellipsis;
		&:focus {
			outline: 0px;
		}
	}
	@media only screen and (max-width: 1199px) {
		max-width: 100%;
	}
	@media only screen and (max-width: 450px) {
		margin: 0 2rem;
	}
`

const MobileMenuContainer = styled.div`
	position: fixed;
	top: 6rem;
	right: ${({ $isVisible }) => ($isVisible ? '0' : '-100%')};
	width: 30rem;
	overflow-y: auto;
	border-left: 1px solid ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.colors.menuBackground};
	display: none;
	flex-direction: column;
	align-items: center;
	transition: all 0.3s ease;
	border-radius: 0 0 0 1rem;
	z-index: 100;
	transition: transform all 0.3s ease-in-out;
	@media (max-width: 1199px) {
		transform: translateX(
			${({ $isVisible }) => ($isVisible ? '0' : '-100%')}
		);
	}
	@media only screen and (max-width: 768px) {
		display: flex;
		top: 5rem;
	}
`
