import React from 'react'
import SketchLines from '../components/SketchLines'

import styled from 'styled-components'
import { SECONDARY_COLOR } from '../constants'

const StyledTitle = styled.h1`
  font-size: 1.15rem;
  font-weight: 500;
  margin: 0;
  color: ${SECONDARY_COLOR};
`

const StyledChildren = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${SECONDARY_COLOR};
  margin: 0;

  & > * {
    margin: 0.5rem 0;
  }
`

interface SectionProps {
  title: string
  children: React.ReactNode | string
}

const Paragraph: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <>
      <SketchLines top bottom>
        <StyledTitle>{title}</StyledTitle>
        <StyledChildren>{children}</StyledChildren>
      </SketchLines>
    </>
  )
}

export default Paragraph
