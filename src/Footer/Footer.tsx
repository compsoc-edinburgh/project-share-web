import styled from 'styled-components'
import Logo from '../components/Logo'

const StyledFooterWrapper = styled.div`
  border: 5px solid #fcf6fe;
  background: #7816f4;
  width: inherit;
  margin: 3vw;
  margin-bottom: 4rem;
  padding: 32px;
  height: 50vh;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Logo animated color="#FBF6FD" size={126} /> ❤️
      <a
        href="https://comp-soc.com"
        target="_blank"
        rel="noreferrer">
        <img
          src="media/logos/comp-soc.png"
          alt="CompSoc Logo"
          style={{ height: '126px' }}
        />
      </a>
    </StyledFooterWrapper>
  )
}

export default Footer
