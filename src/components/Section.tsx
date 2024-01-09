import styled from 'styled-components'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8rem;
  padding: 1rem;

  max-width: 858px;
`

const StyledRotatedText = styled.p`
  position: absolute;
  transform-origin: top left;
  transform: rotate(90deg);
  left: 10px;
  font-size: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    position: relative;
    transform: rotate(0deg);
    margin-bottom: 0;
    left: 0;
  }
`

const Section = ({
  children,
  title,
  ...props
}: {
  children: React.ReactNode
  title?: string
}) => {
  return (
    <StyledMain {...props}>
      <StyledRotatedText>{title}</StyledRotatedText>
      {children}
    </StyledMain>
  )
}

export default Section
