import styled from 'styled-components'
import { Project, SECONDARY_COLOR } from '../constants'
import Placeholder from '../components/Placeholder'
import SketchLines from '../components/SketchLines'
import { StyledLink } from '../components/StyledLink'

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

const ProjectVideo = styled.video`
  width: 100%;
  border-radius: 7px;
  border: 1px solid rgb(0 0 0 / 10%);
  box-sizing: border-box;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProjectTitle = styled.p`
  margin: 0;
  color: ${SECONDARY_COLOR};
`

const Creator = styled.p`
  margin: 0;
  color: grey;
`

const Description = styled.p`
  margin: 5px 0 0 0;
  color: ${SECONDARY_COLOR};
`

const ProjectTile = ({
  id,
  title,
  creator,
  description,
  link,
  media,
  icon,
}: Project) => {
  return (
    <div key={id}>
      <TopBar>
        <ProjectId>#{id}</ProjectId>
        <StyledLink as="a" href={link}>
          Open
        </StyledLink>
      </TopBar>
      <ProjectVideo
        src={media}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
      />
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
            <a href={link}>
              <ProjectTitle>{title}</ProjectTitle>
            </a>

            <span style={{ color: 'gray', userSelect: 'none' }}>{' • '}</span>
            <Creator>{creator}</Creator>
          </div>
          <Description>{description}</Description>
        </div>
      </BottomBar>
    </div>
  )
}

export default ProjectTile
