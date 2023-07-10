import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import {
  ACCENT_COLOR,
  DISCORD_INVITE_LINK,
  SECONDARY_COLOR,
} from '../constants'
import SketchLines from '../components/SketchLines'

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`
const StyledBaseLink = styled.div`
  text-decoration: none;
  color: ${SECONDARY_COLOR};
  font-weight: bold;

  border: 0.8px solid ${SECONDARY_COLOR};
  padding: 0.2rem 1rem;
  border-radius: 20px;

  user-select: none;

  &:hover {
    color: ${ACCENT_COLOR};
  }
`

const Links = () => {
  return (
    <SketchLines top bottom margin={20}>
      <StyledLinksWrapper>
        <StyledBaseLink as={Link} to="/projects">
          /projects
        </StyledBaseLink>
        <StyledBaseLink as={Link} to="/about">
          /about
        </StyledBaseLink>
        <StyledBaseLink
          as="a"
          href={DISCORD_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer">
          Discord
        </StyledBaseLink>
      </StyledLinksWrapper>
    </SketchLines>
  )
}

export default Links
