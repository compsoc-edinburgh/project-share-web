import { FC } from 'react'
import styled from 'styled-components'

const StyledNoShow = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

interface MobileNoShowProps {
  children: React.ReactNode
}

const MobileNoShow: FC<MobileNoShowProps> = ({ children }) => {
  return <StyledNoShow>{children}</StyledNoShow>
}

export default MobileNoShow
