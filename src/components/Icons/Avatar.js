import React from 'react'
import styled from 'styled-components'

export default function Avatar ({ onClick }) {
  return (
      <AvatarButton>
        Login
      </AvatarButton>
  );
}

const AvatarButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.textParagraph};
  background-color: ${({ theme }) => theme.colors.logoRed};
  color: ${({ theme }) => theme.colors.textHeading};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.logoRedHover};
  }
`