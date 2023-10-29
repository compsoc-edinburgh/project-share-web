import styled from 'styled-components'
import { ACCENT_COLOR, SECONDARY_COLOR } from '../constants'
import Logo from '../components/Logo'

const StyledSubHeader = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${SECONDARY_COLOR};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const StyledHeader = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  margin: 0;
  line-height: 4rem;
  color: ${ACCENT_COLOR};

  @media (max-width: 768px) {
    font-size: 3rem;
    line-height: 3rem;
  }
`

const LogoMobileOnly = styled.div`
  display: block;
  box-sizing: border-box;
  line-height: 0;

  @media (min-width: 768px) {
    display: none;
  }

  margin-right: 1rem;
`

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <LogoMobileOnly>
        <Logo size={126} />
      </LogoMobileOnly>

      <div>
        <StyledSubHeader>Story behind your project</StyledSubHeader>
        <StyledHeader>Project Share</StyledHeader>
      </div>
    </div>
  )
}

export default Header
