import styled from 'styled-components'
import { Project } from '../constants'
import ProjectTile from './ProjectTile'
import { FC } from 'react'

const StyledProjectList = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;

    & > :first-child {
      margin-bottom: 50px;
    }
  }
`

const StyledProjectColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`

interface ProjectListProps {
  projects: Project[]
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const evenProjects = projects.filter((p) => p.id % 2 === 0)
  const oddProjects = projects.filter((p) => p.id % 2 !== 0)

  return (
    <StyledProjectList>
      <StyledProjectColumn>
        {evenProjects.map((project) => (
          <ProjectTile key={project.id} {...project} />
        ))}
      </StyledProjectColumn>
      <StyledProjectColumn>
        {oddProjects.map((project) => (
          <ProjectTile key={project.id} {...project} />
        ))}
      </StyledProjectColumn>
    </StyledProjectList>
  )
}
export default ProjectList
