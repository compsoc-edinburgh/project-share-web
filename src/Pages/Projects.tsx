import { styled } from 'styled-components'
import ProjectList from '../ProjectList/ProjectList'
import BackLink from '../components/BackLink'
import { PROJECTS } from '../constants'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8rem;

  max-width: 768px;
`

const Projects = () => {
  return (
    <StyledMain>
      <h2>
        <code>/projects</code>
      </h2>
      <BackLink />
      <ProjectList projects={PROJECTS} />
    </StyledMain>
  )
}

export default Projects
