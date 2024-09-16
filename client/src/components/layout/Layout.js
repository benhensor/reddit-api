import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useMenu } from '../../context/MenuContext'
import Home from '../../features/Home/Home'
import MobileMenu from '../../features/Header/MobileMenu'
import Subreddits from '../../features/Subreddits/Subreddits'
import { getProfileStyle } from '../../utils/getProfileStyle'

export default function Layout() {
  const { mobileMenuVisible, sidebarVisible } = useMenu()
  const profileStyle = useMemo(() => getProfileStyle(), [])

	return (
		<Container>
			<MobileMenuContainer $isVisible={mobileMenuVisible}>
				<MobileMenu profileStyle={profileStyle} username={null} />
			</MobileMenuContainer>
			<Sidebar $isVisible={sidebarVisible}>
				<Subreddits />
			</Sidebar>
			<Main>
				<Home />
			</Main>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: 20px;
	padding-top: 5rem;
`

const MobileMenuContainer = styled.div`
	display: none;
	position: fixed;
	top: 5rem;
	right: 0;
	width: 30rem;
	overflow-y: auto;
	background: ${({ theme }) => theme.colors.background};
	border-left: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 0 0 0 1rem;
	transform: translateX(${({ $isVisible }) => ($isVisible ? '100%' : '0')});
	z-index: 1000;
	transition: all 0.12s ease-in-out;
	@media (max-width: 768px) {
		display: block;
	}
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
	transition: all 0.12s ease-in-out;
	transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
	@media (max-width: 1199px) {
		transform: translateX(
			${({ $isVisible }) => ($isVisible ? '0' : '-100%')}
		);
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
