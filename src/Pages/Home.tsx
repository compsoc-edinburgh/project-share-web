import styled from 'styled-components'
import Navbar from '../Header/Navbar'
import Spacer from '../components/Spacer'
import Footer from '../Footer/Footer'
import Paragraph from '../components/Paragraph'
import MobileShow from '../components/MobileShow'
import NextMeeting from '../NextMeetup/NextMeetup'
import SketchLines from '../components/SketchLines'
import { Link } from 'react-router-dom'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8rem;

  max-width: 768px;
`

const Home = () => {
  return (
    <>
      <Navbar />

      <StyledMain>
        <MobileShow>
          <div style={{ height: '4rem' }} />
          <SketchLines top bottom margin={20}>
            <NextMeeting />
          </SketchLines>
          <Spacer size={32} />
        </MobileShow>
        <Paragraph title="So... what is this?">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
          voluptatum. Quam, voluptas? Officia dolor exercitation labore ipsum.
          Aute sunt tempor sint excepteur voluptate esse. Id magna cillum
          excepteur labore. "
        </Paragraph>

        <Paragraph title="Who can join?">
          HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        </Paragraph>
        <Paragraph title="Want to see more about this website?">
          Check the <Link to="/components">behind the scenes</Link> of this
          website
        </Paragraph>
        <Paragraph title="Lorem ipsum dolor sit amet consectetur">
          HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </Paragraph>
        <Paragraph title="Lorem ipsum dolor sit amet consectetur">
          HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </Paragraph>
      </StyledMain>
      <Footer />
    </>
  )
}

export default Home
