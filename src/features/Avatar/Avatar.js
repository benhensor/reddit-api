import React from 'react'
import styled from 'styled-components'

export default function Avatar({ profileStyle }) {

  console.log(profileStyle);

  const { initials, backgroundColor } = profileStyle;

  return (
    <StyledAvatar style={{ backgroundColor: backgroundColor }}>
      <Initials>{initials}</Initials>
    </StyledAvatar>
  );
}

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.textParagraph};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Initials = styled.span`
  display: block;
`;
