import { NextMeetup } from '../NextMeetup'
import Logo from '../components/Logo'
import MobileNoShow from '../components/MobileNoShow'
import SketchLines from '../components/SketchLines'
import Header from './Header'
import { styled } from 'styled-components'

const StyledBluredNavbar = styled.div`
  position: fixed;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  mix-blend-mode: normal;
  max-width: 768px;
  width: calc(100vw - 65px);
  z-index: 100;
`

const Navbar = () => {
  return (
    <StyledBluredNavbar>
      <MobileNoShow>
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-120%, 0%)',
          }}>
          <Logo size={126} />
        </div>
      </MobileNoShow>

      <SketchLines top bottom left right margin={5000}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Header />
          <MobileNoShow>
            <SketchLines left margin={20}>
              <NextMeetup />
            </SketchLines>
          </MobileNoShow>
        </div>
      </SketchLines>
    </StyledBluredNavbar>
  )
}
export default Navbar
