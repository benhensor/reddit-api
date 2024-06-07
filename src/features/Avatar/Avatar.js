import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Avatar({ userId }) {
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    // Generate a new random avatar URL
    const randomAvatarUrl = `https://xsgames.co/randomusers/avatar.php?g=pixel`
    setThumbnail(randomAvatarUrl)
  }, [userId])

  return (
    <StyledAvatar
      src={thumbnail}
      alt="profile"
    />
  );
}

const StyledAvatar = styled.img`
  border: 1px solid ${({ theme }) => theme.colors.textParagraph};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`