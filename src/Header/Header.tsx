import styled from 'styled-components'
import { ACCENT_COLOR } from '../constants'

const StyledHeader = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  margin: 0;
  line-height: 4.5rem;
  color: ${ACCENT_COLOR};
  width: min-content;

  @media (max-width: 768px) {
    font-size: 3rem;
    line-height: 3rem;
  }
`

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <StyledHeader>Project Share</StyledHeader>
    </div>
  )
}

export default Header
