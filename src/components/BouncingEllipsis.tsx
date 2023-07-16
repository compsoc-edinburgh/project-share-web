import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
    0%, 10% {
        transform: translateY(0);
    }
    5% {
        transform: translateY(-0.3em);
    }
`

const BouncingEllipsisWrapper = styled.span`
  display: inline-flex;
  position: relative;
  width: 1.5em;
`

const Dot = styled.span`
  animation: ${bounce} 5s infinite;
  margin: 0em;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

const BouncingEllipsis = () => {
  return (
    <BouncingEllipsisWrapper>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </BouncingEllipsisWrapper>
  )
}

export default BouncingEllipsis
