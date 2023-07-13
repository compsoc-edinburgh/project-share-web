import styled from 'styled-components'
import Avatar from '../components/Avatar'
import { Creator } from '../constants'

const CreatorWrapper = styled.p`
  margin: 0;
  color: grey;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
`

const StyledContactURL = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
    color: inherit;
  }
`

const CreatorName = ({ name, contactURL }: Creator) => {
  if (contactURL)
    return (
      <StyledContactURL href={contactURL} target="_blank" rel="noreferrer">
        {name}
      </StyledContactURL>
    )

  return <>{name}</>
}

const ProjectCreator = ({ name, avatarURL, contactURL }: Creator) => {
  return (
    <CreatorWrapper>
      {avatarURL && <Avatar src={avatarURL} name={name} />}
      <CreatorName name={name} contactURL={contactURL} />
    </CreatorWrapper>
  )
}

export default ProjectCreator
