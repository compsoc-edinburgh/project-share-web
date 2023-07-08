import styled from 'styled-components'
import { ACCENT_COLOR, SECONDARY_COLOR } from '../constants'

const StyledSubHeader = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${SECONDARY_COLOR};
  margin: 0;
`

const StyledHeader = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  margin: 0;
  line-height: 4rem;
  color: ${ACCENT_COLOR};
`

const Header = () => {
  return (
    <div>
      <StyledSubHeader>By students for students</StyledSubHeader>
      <StyledHeader>Project Share</StyledHeader>
    </div>
  )
}

export default Header
