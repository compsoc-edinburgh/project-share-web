import styled from 'styled-components'
import SketchLines from '../components/SketchLines'
import Logo from '../components/Logo'
import { ACCENT_COLOR } from '../constants'

const StyledFooterWrapper = styled.div`
  position: relative;
  display: flex;

  height: 15vh;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
  background-color: ${ACCENT_COLOR}09;
  font-size: 0.75rem;
  text-align: center;
  z-index: 1;
`
const Footer = () => {
  return (
    <SketchLines top bottom margin={5000}>
      <StyledFooterWrapper>
        <Logo size={64} />
        {'❤️'}
        <img
          src="./comp-soc.png"
          alt="CompSoc"
          width="100px"
          draggable={false}
        />
      </StyledFooterWrapper>
    </SketchLines>
  )
}

export default Footer
