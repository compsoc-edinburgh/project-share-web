import { NextMeetup } from '../NextMeetup'
import SketchLines from '../components/SketchLines'
import Header from './Header'

const Navbar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        mixBlendMode: 'normal',
        zIndex: 100,
      }}>
      <SketchLines top left bottom>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Header />
          <NextMeetup />
        </div>
      </SketchLines>
    </div>
  )
}
export default Navbar
