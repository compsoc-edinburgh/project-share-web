import { FC } from 'react'
import styled from 'styled-components'
import { MAIN_COLOR } from '../constants'

const StyledSpacerSize = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #7816f4;
  margin: 0;
`

const StyledVerticalSpacerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StyledHorizontalSpacerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface SpacerProps {
  direction?: 'horizontal' | 'vertical'
  size?: number
}

const Spacer: FC<SpacerProps> = ({ direction = 'vertical', size = 32 }) => {
  if (direction === 'vertical') {
    return (
      <StyledVerticalSpacerWrapper>
        <svg
          width="12"
          height={size + 2}
          viewBox={`0 0 12 ${size + 2}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d={`M6 1L11 6M6 1L1 6M6 1V${size + 1}M6 ${size + 1}L11 ${
              size - 4
            }M6 ${size + 1}L1 ${size - 4}`}
            stroke={MAIN_COLOR}
          />
        </svg>
        <StyledSpacerSize>{size}px</StyledSpacerSize>
      </StyledVerticalSpacerWrapper>
    )
  } else {
    return (
      <StyledHorizontalSpacerWrapper>
        <StyledSpacerSize>{size}px</StyledSpacerSize>
        <svg
          width={size + 3}
          height="12"
          viewBox={`0 0 ${size + 3} 12`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d={`M1 6L6 1M1 6L6 11M1 6L${size + 1} 6M${size + 1} 6L${
              size - 4
            } 1M${size + 1} 6L${size - 4} 11`}
            stroke={MAIN_COLOR}
          />
        </svg>
      </StyledHorizontalSpacerWrapper>
    )
  }
}

export default Spacer
