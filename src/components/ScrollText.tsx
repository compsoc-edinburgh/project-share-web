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

const StaticText = styled(motion.span)``

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
      return (value - 0.4) * 10
    } else if (value > 0.75 && value <= 0.8) {
      return Math.max(1 - (value - 0.75) * 10, 0.2)
    } else if (value > 0.8) {
      return 0.2
    }
    return 0
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
