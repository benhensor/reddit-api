import React from 'react'
import styled from 'styled-components'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import Avatar from '../Avatar/Avatar'
import AddIcon from '../../components/Icons/AddIcon'
import MoreVertIcon from '../../components/Icons/MoreVertIcon'

export default function UserControls({ isTabletView, toggleTheme, handleMobileMenu }) {

  const DesktopControls = () => (
    <>
      <CreatePost><AddIcon/>Create Post</CreatePost>
      <ToggleSwitch onClick={toggleTheme} />
      <Avatar />
    </>
  )

  const TabletControls = () => (
    <>
      <Avatar />
      <MoreVertIcon onClick={handleMobileMenu}/>
    </>
  )

  return (
    <Controls>
      {!isTabletView ? <DesktopControls /> : <TabletControls />}
    </Controls>
  )
}

const Controls = styled.div`
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
