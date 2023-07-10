import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 0;
  padding: 0;
`

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
    <StyledBackButton onClick={goBack}>
      <code>{'<-'} Back</code>
    </StyledBackButton>
  )
}

export default BackLink
