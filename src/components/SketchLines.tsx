import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MAIN_COLOR } from '../constants'

const StyledSketchLines = styled.div<{
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  scaler: { x: number; y: number }
}>`
  position: relative;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-top: ${({ top }) => (top ? '1px solid' : 'none')} ${MAIN_COLOR};
    border-bottom: ${({ bottom }) => (bottom ? '1px solid' : 'none')}${MAIN_COLOR};
    border-left: ${({ left }) => (left ? '1px solid' : 'none')} ${MAIN_COLOR};
    border-right: ${({ right }) => (right ? '1px solid' : 'none')} ${MAIN_COLOR};

    z-index: -1;
    transform: ${({ top, bottom, left, right, scaler }) => {
      if (top || bottom) {
        return `scaleX(${scaler.x})`
      } else if (left || right) {
        return `scaleY(${scaler.y})`
      } else {
        return `scale(1)`
      }
    }};
  }
`

interface SketchLinesProps {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  margin?: number
  children: ReactNode
}

const SketchLines: FC<SketchLinesProps> = ({
  top = false,
  bottom = false,
  left = false,
  right = false,
  margin = 20,
  children,
}) => {
  // Must handle scaling of both axes separately as it would distort the width of the lines on other axes
  const ref = useRef<HTMLDivElement>(null)
  const [scaler, setScaler] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // TODO: Consider debouncing this
    const handleResize = () => {
      if (!ref.current) return

      const { width, height } = ref.current.getBoundingClientRect()
      // calculating a stretch factor given the desired margin
      setScaler({
        x: (margin + width) / width,
        y: (margin + height) / height,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [margin])

  return (
    <StyledSketchLines top={top} bottom={bottom} scaler={scaler}>
      <StyledSketchLines left={left} right={right} scaler={scaler} ref={ref}>
        {children}
      </StyledSketchLines>
    </StyledSketchLines>
  )
}

export default SketchLines
