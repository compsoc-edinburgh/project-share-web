import styled from 'styled-components'
import FlippableCard from '../components/FlippableCard'
import Logo from '../components/Logo'
import NextMeeting from '../NextMeetup/NextMeetup'
import { Stage } from '@pixi/react'
import Gravity from './Gravity'
import { ACCENT_COLOR } from '../constants'
import { useEffect, useRef, useState } from 'react'
import Boids from './Boids'
import BrickBreaker from  './Breaker'

const StyledStage = styled(Stage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;

  @media (max-width: 768px) {
    pointer-events: none;
  }
`

const StyledHeaderWrapper = styled.div`
  outline: 5px solid #7816f4;
  background: repeating-conic-gradient(
      rgb(252, 246, 254) 0%,
      rgb(252, 246, 254) 25%,
      rgb(242, 225, 247) 0%,
      rgb(242, 225, 247) 50%
    )
    50% center / 3px 3px;
  width: inherit;
  margin: 3vw;
  height: 85vh;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Header = () => {
  const [stageWidth, setStageWidth] = useState<number>(window.innerWidth)
  const [stageHeight, setStageHeight] = useState<number>(window.innerHeight)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setStageWidth(ref.current.clientWidth)
      setStageHeight(ref.current.clientHeight)
    }
  }, [ref])

  const possibleStageBackgrounds = [
    {
      stage: <Gravity />,
      creator: 'Tomas Maillo',
      url: 'https://tomasmaillo.com',
    },
    {
      stage: <Boids />,
      creator: 'Tomas Maillo',
      url: 'https://tomasmaillo.com',
    },
    {
      stage: <BrickBreaker />,
      creator: 'Ali Abdelaal',
      url: 'https://3li.ae',
    }
  ]

  const [currentStageIndex, setCurrentStageIndex] = useState(
    Math.floor(Math.random() * possibleStageBackgrounds.length)
  )

  const nextStage = () => {
    setCurrentStageIndex(
      (prevIndex) => (prevIndex + 1) % possibleStageBackgrounds.length
    )
  }

  useEffect(() => {
    setCurrentStageIndex(
      Math.floor(Math.random() * possibleStageBackgrounds.length)
    )
  }, [])

  return (
    <StyledHeaderWrapper ref={ref}>
      <FlippableCard
        key="unique"
        frontContent={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              width: '100%',
            }}>
            <Logo size={120} />
            <h1
              style={{
                fontSize: '3.75rem',
                margin: 0,
                color: ACCENT_COLOR,
                userSelect: 'none',
              }}>
              Project <br />
              Share
            </h1>
          </div>
        }
        backContent={
          <div
            style={{
              display: 'flex',
            }}>
            <NextMeeting />
          </div>
        }
      />

      <StyledStage
        width={stageWidth}
        height={stageHeight}
        options={{ backgroundAlpha: 0 }}>
        {possibleStageBackgrounds[currentStageIndex].stage}
      </StyledStage>
      <div>
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            alignContent: 'center',
          }}>
          <a
            href={possibleStageBackgrounds[currentStageIndex].url}
            style={{
              color: ACCENT_COLOR,
              textDecoration: 'none',
              userSelect: 'none',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '0rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: '5rem',
              backdropFilter: 'blur(5px)',
            }}>
            interaction by {possibleStageBackgrounds[currentStageIndex].creator}
          </a>
          <button
            style={{
              color: ACCENT_COLOR,
              textDecoration: 'none',
              userSelect: 'none',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '0rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: '5rem',
              backdropFilter: 'blur(5px)',
            }}
            onClick={() => nextStage()}>
            ↻
          </button>
        </div>
      </div>
    </StyledHeaderWrapper>
  )
}

export default Header
