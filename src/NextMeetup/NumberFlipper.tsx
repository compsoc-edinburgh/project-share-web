import { useSpring, MotionValue, useTransform, motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'

const fontSize = 24
const padding = 0
const height = fontSize + padding

const NumberFlipperContainer = styled.div`
  display: flex;
  overflow: hidden;
  background: white;
  padding: 0rem;
`

const DigitContainer = styled.div`
  height: ${height}px;
  position: relative;
  width: 1ch;
`

const NumberSpan = styled(motion.span)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

function NumberFlipper({
  value,
  precision,
}: {
  value: number
  precision: number
}) {
  return (
    <NumberFlipperContainer>
      {new Array(precision).fill(0).map((_, i) => (
        <Digit key={i} place={10 ** (precision - i -1)} value={value} />
      ))}
    </NumberFlipperContainer>
  )
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place)
  let animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <DigitContainer>
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </DigitContainer>
  )
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10
    let offset = (10 + number - placeValue) % 10
    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return memo
  })

  return <NumberSpan style={{ y }}>{number}</NumberSpan>
}

export default NumberFlipper
