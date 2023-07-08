import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 0;
  padding: 0;
`

const BackLink = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <StyledBackButton onClick={goBack}>
      <code>{'<-'} Back</code>
    </StyledBackButton>
  )
}

export default BackLink
