import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const wavyAnimation = keyframes`
    40% {
      color: black;
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    50% {
      color: #7816f4;
      opacity: 0.7;
      transform: translateY(-3px) scale(0.9);
    }
    
    60% {
      color: black;
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  `

const WavySpan = styled.span<{ delay: number }>`
  display: inline-block;
  animation: ${wavyAnimation} 3s ease infinite;
  animation-delay: ${({ delay }) => delay}ms;
`

const WavyText = ({ text, ...props }: { text: string }) => {
  const [letters, setLetters] = useState<string[]>([])

  useEffect(() => {
    setLetters(text.split(''))
  }, [text])

  return (
    <span
      {...props}
      style={{
        display: 'inline-block',
        whiteSpace: 'pre',
      }}>
      {letters.map((letter, index) => (
        <WavySpan key={index} delay={index * 60}>
          {letter}
        </WavySpan>
      ))}
    </span>
  )
}

export default WavyText
