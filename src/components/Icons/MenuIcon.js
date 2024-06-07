import React from 'react'
import styled from 'styled-components'

export default function MenuIcon({ onClick, isSidebarVisible }) {
	return (
		<Container onClick={onClick}>
			{Array.from({ length: 3 }).map((_, index) => (
				<Bar key={index} $isOpen={isSidebarVisible} />
			))}
		</Container>
	)
}

const Container = styled.div`
	display: none;
	@media only screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 25px;
		height: 25px;
		cursor: pointer;
	}
`

const Bar = styled.div`
	width: 25px;
	height: 2px;
	background-color: ${({ theme }) => theme.colors.textParagraph};
	border-radius: 1px;
	transition: all 0.12s ease-in-out;
	transform-origin: center;

	${({ $isOpen }) =>
		$isOpen &&
		`
    &:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  `}
`
