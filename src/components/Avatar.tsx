import { FC } from 'react'
import styled from 'styled-components'

const StyledAvatarImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 7px;
  object-fit: cover;
  user-select: none;
`

export interface AvatarProps {
  name: string
  src: string
}

const Avatar: FC<AvatarProps> = ({ src, name }) => {
  return (
    <StyledAvatarImg src={src} alt={`${name}'s avatar'`} draggable={false} />
  )
}

export default Avatar
