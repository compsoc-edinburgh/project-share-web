import styled from 'styled-components'
import { Project, SECONDARY_COLOR } from '../constants'
import Placeholder from '../components/Placeholder'
import SketchLines from '../components/SketchLines'
import { StyledLink } from '../components/StyledLink'
import ProjectCreator from './ProjectCreator'
import Dot from '../components/Dot'
import { useState } from 'react'
import Logo from '../components/Logo'

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
`

const ProjectId = styled.p`
  margin: 0;
  color: gray;
  user-select: none;
`

const ProjectVideoWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid rgb(0 0 0 / 10%);
  background-color: #f7f6f3;
`

const ProjectVideo = styled.video`
  width: 100%;
  border-radius: 7px;
  box-sizing: border-box;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  margin: 0;
  padding: 0;
  display: block;
`

const BottomBar = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr;
  gap: 10px;
  padding: 10px;
`

const IconHolder = styled.div`
  width: 25px;
  height: 25px;
  margin: 0;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProjectTitle = styled.p<{ hasURL?: boolean }>`
  margin: 0;
  color: ${SECONDARY_COLOR};
  white-space: nowrap;

  &:hover {
    text-decoration: ${({ hasURL }) => (hasURL ? 'underline' : 'none')};
  }
`

const CreatorsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const Description = styled.p`
  margin: 5px 0 0 0;
  color: ${SECONDARY_COLOR};
`

const ProjectTile = ({
  id,
  title,
  creators,
  description,
  projectURL,
  media,
  icon,
}: Project) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <div key={id}>
      <TopBar>
        <ProjectId>#{id}</ProjectId>
        {projectURL && (
          <StyledLink as="a" href={projectURL}>
            Open
          </StyledLink>
        )}
      </TopBar>
      <ProjectVideoWrapper>
        <ProjectVideo
          src={media}
          controls={false}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}>
          {!isVideoLoaded && <Logo size={32} animated={true} />}
        </div>
      </ProjectVideoWrapper>

      <BottomBar>
        <SketchLines top bottom left right margin={7}>
          <IconHolder>
            {icon ? (
              <img src={icon} alt={title} draggable={false} />
            ) : (
              <Placeholder size={'25px'} />
            )}
          </IconHolder>
        </SketchLines>

        <div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <a href={projectURL} target="_blank" rel="noreferrer">
              <ProjectTitle hasURL={!!projectURL}>{title}</ProjectTitle>
            </a>

            <Dot />

            <CreatorsWrapper>
              {creators.map((creator, i) => (
                <div key={i}>
                  <ProjectCreator {...creator} />
                </div>
              ))}
            </CreatorsWrapper>
          </div>
          <Description>{description}</Description>
        </div>
      </BottomBar>
    </div>
  )
}

export default ProjectTile
