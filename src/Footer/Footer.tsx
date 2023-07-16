import styled from 'styled-components'
import SketchLines from '../components/SketchLines'
import Logo from '../components/Logo'
import { ACCENT_COLOR } from '../constants'

const StyledFooterWrapper = styled.div`
  position: relative;
  display: flex;

  height: 15vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${ACCENT_COLOR}09;
  font-size: 0.75rem;
  text-align: center;
  z-index: 1;

  user-select: none;
`
const Footer = () => {
  return (
    <SketchLines top bottom margin={5000}>
      <StyledFooterWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            alignItems: 'center',
          }}>
          <Logo size={64} />
          {'❤️'}
          <img
            src="./media/logos/comp-soc.png"
            alt="CompSoc"
            width="100px"
            draggable={false}
          />
        </div>
        <span
          style={{
            color: 'black',
          }}>
          Project Share is a{' '}
          <a href="https://comp-soc.com/special-interest-groups">CompSoc SIG</a>
        </span>
      </StyledFooterWrapper>
    </SketchLines>
  )
}

export default Footer
