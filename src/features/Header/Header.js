import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '../../components/Icons/MenuIcon'
import LogoFace from '../../components/Icons/LogoFace'
import LogoText from '../../components/Icons/LogoText'
import SearchIcon from '../../components/Icons/SearchIcon'
import AddIcon from '../../components/Icons/AddIcon'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import LoginButton from '../../components/Icons/LoginButton'
import Avatar from '../../features/Avatar/Avatar'
import MoreVertIcon from '../../components/Icons/MoreVertIcon'
import MobileMenu from './MobileMenu'
import { setSearchTerm } from '../../store/redditSlice'
import { selectName, selectIsLoggedIn, setIsLoggedIn } from '../../store/userSlice'


export default function Header({ tablet, currentTheme, toggleTheme, toggleAside, setIsSidebarVisible }) {
	const dispatch = useDispatch()
	const username = useSelector(selectName)
	const isLoggedIn = true

	const [searchTermLocal, setSearchTermLocal] = useState('')
	const searchTerm = useSelector((state) => state.reddit.searchTerm)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const handleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const onSearchTermChange = (e) => {
		setSearchTermLocal(e.target.value);
	};

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

	const onSearchTermSubmit = (e) => {
		e.preventDefault();
		dispatch(setSearchTerm(searchTermLocal));
	};

	return (
			<StyledHeader>
				<Logo>
					<MenuIcon onClick={toggleAside} isAsideVisible={setIsSidebarVisible} />
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
							onKeyDown={
								(e) => {
									if (e.key === 'Enter') {
										onSearchTermSubmit(e)
									}
								}
							}
						/>
					</span>
				</Search>
				{!tablet ? (
					<UserControls>
						<ToggleSwitch onClick={toggleTheme} />
						{!tablet ? <LoginButton onClick={() => dispatch(setIsLoggedIn(true))} /> : <Avatar name={username} />}
					</UserControls>
				) : (
					<UserControls>
						<CreatePost>
							<AddIcon />
							Create
						</CreatePost>
						<ToggleSwitch onClick={toggleTheme} />
						<Avatar name={username} />
						<MoreVertIcon onClick={handleMobileMenu} />
					</UserControls>
				)}
				{isMobileMenuOpen && (
					<MobileMenuContainer $isVisible={isMobileMenuOpen}>
						<MobileMenu currentTheme={currentTheme} toggleTheme={toggleTheme} username={null}/>
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

const UserControls = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const CreatePost = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 1rem;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.textParagraph};
	border: none;
	border-radius: 2rem;
	font-size: 1.4rem;
	cursor: pointer;
	svg {
		width: 2rem;
		height: 2rem;
		stroke: ${({ theme }) => theme.colors.textParagraph};
	}
	&:hover {
		background-color: ${({ theme }) => theme.colors.elementBackground};
	}

`

const MobileMenuContainer = styled.div`
	position: fixed;
	top: 5.1rem;
	right: 0;
	transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
	width: 30rem;
	background-color: ${({ theme }) => theme.colors.menuBackground};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	transition: all 0.3s ease;
	border-radius: 0 0 0 1rem;
	z-index: 100;
`
