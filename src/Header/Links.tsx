import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { ACCENT_COLOR, SECONDARY_COLOR } from '../constants'
import SketchLines from '../components/SketchLines'

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${SECONDARY_COLOR};
  font-weight: bold;

  border: 0.8px solid ${SECONDARY_COLOR};
  padding: 0.2rem 0.5rem;
  border-radius: 15px;

  &:hover {
    color: ${ACCENT_COLOR};
  }
`

const Links = () => {
  return (
    <SketchLines top bottom margin={20}>
      <StyledLinksWrapper>
        <StyledLink to="/projects">/projects</StyledLink>
        <StyledLink to="/about">/about</StyledLink>
      </StyledLinksWrapper>
    </SketchLines>
  )
}

export default Links
