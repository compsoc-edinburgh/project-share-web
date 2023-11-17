import styled from 'styled-components'
import Logo from '../components/Logo'

const StyledFooterWrapper = styled.div`
  border: 5px solid #fcf6fe;
  background: #7816f4;
  width: inherit;
  margin: 3vw;
  margin-bottom: 4rem;
  padding: 3vw;
  height: 65vh;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Logo animated color="#FBF6FD" />
    </StyledFooterWrapper>
  )
}

export default Footer
