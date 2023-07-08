import { FC } from 'react'
import styled from 'styled-components'

const StyledShow = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`

interface MobileShowProps {
  children: React.ReactNode
}

const MobileShow: FC<MobileShowProps> = ({ children }) => {
  return <StyledShow>{children}</StyledShow>
}

export default MobileShow
