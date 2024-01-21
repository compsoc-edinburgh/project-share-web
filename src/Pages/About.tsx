import styled from 'styled-components'
import Logo from '../components/Logo'

const Background = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const Page = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0rem auto;
  padding-top: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  color: black;

  @media (max-width: 600px) {
    padding: 24px;
  }
  margin-bottom: 4rem;
`

const About = () => {
  const user = 'partners'
  const domain = 'comp-soc'
  const tld = 'com'

  const contactEmail = `${user}@${domain}.${tld}`

  return (
    <Background>
      <Page>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'row',
            marginBottom: '2rem',
            justifyContent: 'space-between',
          }}>
          <Logo size={64} />

          {new Date().getFullYear()}
        </div>
        <h3>About</h3>

        <p>
          Created by four friends on February 16, 2023, Project Share quickly
          evolved from casual discussions about personal projects into a vibrant
          community of creative minds. It is a place where students showcase and
          discuss their projects, exchange ideas, and connect with like-minded
          individuals.
        </p>
        <p>
          Project Share reached a milestone in September 2023 when we teamed up
          with <a href="https://comp-soc.com">CompSoc</a>, the Computer Science
          Society of the University of Edinburgh. This partnership marked the
          beginning of a new chapter as a Special Interest Group (SIG),
          amplifying our reach and impact. Together, we're building a dynamic
          community where enthusiastic students from every corner of the
          university bring their projects to life, share their unique insights,
          and connect with industry leaders.
        </p>

        <h3>Sponsors</h3>
        <p>
          Project Share is formed by a subset of the most talented, proactive
          and social tech students at the University of Edinburgh, catering to
          those who already possess a solid foundation in tech and are actively
          applying their skills.
        </p>
        <p>
          During our fortnightly meetings we bring together developers who are
          dedicated to building remarkable projects in their spare time. They
          showcase their progress on projects and hear updates from others,
          giving members a chance to exchange valuable insights and lessons
          learned.
        </p>
        <p>
          In Project Share’s first semester of operation, we created a community
          of 250 members and followed the development of more than 40 projects.
          These projects range from custom-built online delivery systems, 3D
          websites, compilers, to AI chess engines. Many members have secured
          part-time jobs and summer internships through contacts made at Project
          Share.
        </p>

        <p>
          Looking ahead, we aim to broaden our presence to include the talent of
          electrical and mechanical engineering students into our community, in
          combination with running more events like hackathons.
        </p>
        <p>
          Project Share is actively seeking the support of sponsors to reach our
          future goals. We are looking for industry speakers to enrich our
          sessions, as well as sponsors aiming to increase their brand
          visibility within this Special Interest Group (SIG). For brands
          seeking to connect with top-tier, proactive talent, Project Share
          offers the ideal platform.
        </p>
        <p>
          If you are interested in sponsoring Project Share, please contact us
          at through our parent society CompSoc at{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <h3>Contact</h3>
        <a
          href="https://forms.gle/bCuHdZdJ1bXEsmnP7"
          target="_blank"
          rel="noreferrer">
          Feedback Form
        </a>
      </Page>
    </Background>
  )
}

export default About
