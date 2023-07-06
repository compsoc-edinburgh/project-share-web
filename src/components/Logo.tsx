import { FC } from 'react'

interface LogoProps {
  size?: number
}

const Logo: FC<LogoProps> = ({ size = 126 }) => {
  return (
    <img
      src="./project-share.svg"
      alt="Project Share Logo"
      width={size}
      height={size}
      draggable={false}
    />
  )
}

export default Logo
