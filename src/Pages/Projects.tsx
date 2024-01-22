import { styled } from 'styled-components'
import ProjectList from '../ProjectList/ProjectList'
import { PROJECTS } from '../constants'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8rem;

  max-width: 858px;
`

const Projects = () => {
  return (
    <StyledMain>
      <h2>
        <code>/projects</code>
      </h2>

      <ProjectList projects={PROJECTS} />
    </StyledMain>
  )
}

export default Projects
