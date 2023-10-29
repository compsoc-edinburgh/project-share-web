import styled from 'styled-components'
import Navbar from '../Header/Navbar'
import Spacer from '../components/Spacer'
import Footer from '../Footer/Footer'
import Paragraph from '../components/Paragraph'
import MobileShow from '../components/MobileShow'
import NextMeeting from '../NextMeetup/NextMeetup'
import SketchLines from '../components/SketchLines'
import { Link } from 'react-router-dom'
import Links from '../Header/Links'
import ProjectList from '../ProjectList/ProjectList'
import { PROJECTS, PROJECTS_SHOWN_ON_HOMEPAGE } from '../constants'
import { StyledLink } from '../components/StyledLink'
import FlippableCard from '../components/FlippableCard'
import Logo from '../components/Logo'
import Header from '../Header/Header'
import Title from '../components/Title'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8rem;

  max-width: 768px;
`

const Home = () => {
  return (
    <>
      <div
        style={{
          border: '5px solid #7816F4',
          background:
            'repeating-conic-gradient(rgb(252, 246, 254) 0%, rgb(252, 246, 254) 25%, rgb(242, 225, 247) 0%, rgb(242, 225, 247) 50%) 50% center / 3px 3px',
          width: 'calc(100%-2vw)',
          height: '87dvh',
          margin: 'auto',
          borderRadius: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Title />
      </div>

      <div
        style={{
          border: '5px solid #7816F4',
          background:
            'repeating-conic-gradient(rgb(252, 246, 254) 0%, rgb(252, 246, 254) 25%, rgb(242, 225, 247) 0%, rgb(242, 225, 247) 50%) 50% center / 3px 3px',
          height: '5vh',
          width: 'min-contents',
          margin: 'auto',
          marginTop: '1rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'fixed',
          padding: '0 2rem 0 2rem',
          bottom: '1vw',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '100',
        }}>
        <b>Home</b>
        <b>About</b>
        <b>Team</b>
        <b>Discord</b>
      </div>

      <StyledMain>
        <MobileShow>
          <div style={{ height: '2rem' }} />
        </MobileShow>

        <Links />
        <Spacer size={32} />

        <MobileShow>
          <SketchLines top bottom margin={20}>
            <NextMeeting />
          </SketchLines>
          <Spacer size={32} />
        </MobileShow>

        <Paragraph title="So... what is this?">
          <p>
            Glad you asked! Picture this: every other week, an enthusiastic
            group of tech lovers huddle together around a metaphorical campfire.
          </p>
          <p>
            Each one of us, from those working on our first website to the
            seasoned pros building complex multiplayer games, we bring our
            projects to the table! Fueled by curiosity and a passion for
            learning, we turn our individual insights into collective "aha!"
            moments.
          </p>
          <p>
            It's not about the grandeur of the project, but the story it tells,
            the challenges faced, and the triumphs enjoyed.
          </p>
        </Paragraph>
        <Spacer size={64} />
        <Paragraph title="Who can join?">
          <p>
            Anyone! The only condition? Be prepared to share your journey.
            Embrace the opportunity to allow us all to learn and grow through
            your experiences. After all, at the heart of every project lies a
            story worth sharing. Welcome to Project Share.
          </p>
        </Paragraph>
        <Spacer size={64} />
        <Paragraph title="Projects that have been shared at Project Share">
          <p>Take a look</p>
          <ProjectList
            projects={PROJECTS.slice(0, PROJECTS_SHOWN_ON_HOMEPAGE)}
          />

          {PROJECTS.length > PROJECTS_SHOWN_ON_HOMEPAGE && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem 0 2rem 0',
              }}>
              <StyledLink as={Link} to="/projects">
                See more
              </StyledLink>
            </div>
          )}
        </Paragraph>
        <Spacer size={64} />
        <Paragraph title="Want to know more about this website?">
          <p>
            Check the <Link to="/components">behind the scenes</Link> of this
            website
          </p>
        </Paragraph>
        <Spacer size={128} />
      </StyledMain>
    </>
  )
}

export default Home
