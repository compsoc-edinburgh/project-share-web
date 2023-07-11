import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { DISCORD_INVITE_LINK } from '../constants'
import SketchLines from '../components/SketchLines'
import { StyledLink } from '../components/StyledLink'

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`

const Links = () => {
  return (
    <SketchLines top bottom margin={20}>
      <StyledLinksWrapper>
        <StyledLink as={Link} to="/projects">
          /projects
        </StyledLink>
        <StyledLink as={Link} to="/team">
          /team
        </StyledLink>
        <StyledLink
          as="a"
          href={DISCORD_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer">
          Discord
        </StyledLink>
      </StyledLinksWrapper>
    </SketchLines>
  )
}

export default Links
