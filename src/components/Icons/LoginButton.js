import React from 'react'
import styled from 'styled-components'

export default function LoginButton ({ onClick }) {
  return (
      <Login onClick={onClick}>
        Login
      </Login>
  );
}

const Login = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.textParagraph};
  background-color: ${({ theme }) => theme.colors.logoRed};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.logoRedHover};
  }
`