import React from 'react'
import styled from 'styled-components'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import Avatar from '../Avatar/Avatar';
import { LuShirt } from "react-icons/lu";
import { IoTrophyOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { GrTarget } from "react-icons/gr";
import { SlSettings } from "react-icons/sl";
import { PiShieldPlus } from "react-icons/pi";

export default function MobileMenu({ currentTheme, toggleTheme, username, profileStyle }) {

  const isLightMode = currentTheme === 'light'
  const mode = isLightMode ? <MdOutlineDarkMode/> : <MdOutlineLightMode/> 
  const modeText = isLightMode ? 'Dark Mode' : 'Light Mode'

  const MenuCard = ({icon, text}) => {
    return (
      <Card>
        <Icon>
          {icon}
        </Icon>
        <Text>
          <p>{text}</p>
          {username && <Username>u/{username}</Username>}
        </Text>
      </Card>
    )
  }

  return (
    <Container>
      <MenuSection>
        <CardContainer>
          <MenuCard icon={<Avatar profileStyle={profileStyle}/>} text='View Profile' />
        </CardContainer>
        <CardContainer>
          <MenuCard icon={<LuShirt/>} text='Edit Avatar' />
        </CardContainer>
        <CardContainer>
          <MenuCard icon={<IoTrophyOutline/>} text='Achievements' />
        </CardContainer>
        <CardContainer>
          <MenuCard icon={<LuWallet/>} text='Contributor Program' />
        </CardContainer>
        <CardContainer>
          <MenuCard icon={mode} text={modeText} />
          <ToggleSwitch onClick={toggleTheme} />
        </CardContainer>
        <CardContainer>
          <MenuCard icon={<LuLogOut/>} text='Log Out' />
        </CardContainer>
      </MenuSection>
      <MenuSection>
        <CardContainer>
          <MenuCard icon={<GrTarget/>} text='Advertise on Reddit'/>
        </CardContainer>
      </MenuSection>
      <MenuSection>
        <CardContainer>
          <MenuCard icon={<SlSettings/>} text='Settings' />
        </CardContainer>
      </MenuSection>
      <MenuSection>
        <CardContainer>
          <MenuCard icon={<PiShieldPlus/>} text='Premium' />
        </CardContainer>
      </MenuSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 10000;
`

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  transition: .12s;
  &:hover {
    background: ${({ theme }) => theme.colors.elementBackgroundHover};

  }
`

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  > p {
    font-size: 1.4rem;
    font-weight: 400;
  }
`

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-right: 1rem;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
`

const Username = styled.p`
  font-size: 1rem;
`