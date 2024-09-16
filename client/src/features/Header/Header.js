import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useMenu } from '../../context/MenuContext'
import MenuIcon from '../../components/Icons/MenuIcon'
import LogoFace from '../../components/Icons/LogoFace'
import LogoText from '../../components/Icons/LogoText'
import SearchIcon from '../../components/Icons/SearchIcon'
import UserControls from './UserControls'
import { setSearchTerm } from '../../store/redditSlice'
import { getProfileStyle } from '../../utils/getProfileStyle'

export default function Header() {
	const dispatch = useDispatch()
	const { toggleAside } = useMenu()
	const [searchTermLocal, setSearchTermLocal] = useState('')
	const searchTerm = useSelector((state) => state.reddit.searchTerm)
	const [isTabletView, setIsTabletView] = useState(window.innerWidth <= 768)
	const profileStyle = useMemo(() => getProfileStyle(), [])

	useEffect(() => {
		const handleResize = () => {
			setIsTabletView(window.innerWidth <= 768)
		}

		window.addEventListener('resize', handleResize)

		// Clean up the event listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

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

	const handleRefresh = () => {
		window.location.reload()
		console.log('refreshed')
	}

	return (
		<>
			<StyledHeader>
				<Logo>
					<MenuIcon
						onClick={toggleAside}
					
					/>
					<LogoFace onClick={handleRefresh} />
					<LogoText onClick={handleRefresh} />
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
				/>
			</StyledHeader>
		</>
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
