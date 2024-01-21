import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'

const ScrollTextWrapper = styled.div`
  font-size: 4rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TextContainer = styled.span`
  position: relative;
  overflow: hidden;
`

const StaticText = styled(motion.span)`
  transition: 0.2s;
  color: #7816f4;
`

interface ContentLineProps {
  content: string
}

const ContentLine: React.FC<ContentLineProps> = ({ content }) => {
  const contentRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['end end', 'start start'],
  })

  const customTransform = (value: number) => {
    if (value >= 0.4 && value <= 0.75) {
      return Math.max((value - 0.4) * 10, 0.1)
    } else if (value > 0.75 && value <= 0.8) {
      return Math.max(1 - (value - 0.75) * 10, 0.1)
    }
    return 0.1
  }

  const scrollValue = useTransform(scrollYProgress, customTransform)

  return (
    <TextContainer ref={contentRef}>
      <StaticText style={{ opacity: scrollValue }}>{content}</StaticText>
    </TextContainer>
  )
}

interface ScrollTextProps {
  content: string[]
}

const ScrollText: React.FC<ScrollTextProps> = ({ content }) => {
  return (
    <ScrollTextWrapper>
      {content.map((item) => (
        <>
          <ContentLine content={item} />{' '}
        </>
      ))}
    </ScrollTextWrapper>
  )
}

export default ScrollText
