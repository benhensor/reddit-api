import React from 'react';
import styled from 'styled-components';

export default function Card(props) {
  return (
    <StyledCard>{props.children}</StyledCard>
  )
}

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.elementBackground};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  margin-bottom: .4rem;
  border-radius: .4rem;
  padding: 2.4rem;
  transition: box-shadow 0.1s ease-in;
  color: ${({ theme }) => theme.colors.textParagraph};
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }
`