import React from 'react'
import styled from 'styled-components'

export default function Avatar(props) {
  const { name, thumbnail } = props
  return (
    <StyledAvatar
      src={thumbnail}
      alt={`${name} profile`}
    />
  );
}

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`