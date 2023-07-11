import { useNavigate, useLocation } from 'react-router-dom'
import { StyledLink } from './StyledLink'

const BackLink = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    if (location.state?.from) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <StyledLink as="a" onClick={goBack}>
      Back
    </StyledLink>
  )
}

export default BackLink
