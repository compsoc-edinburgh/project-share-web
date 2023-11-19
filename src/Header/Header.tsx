import styled from 'styled-components'
import FlippableCard from '../components/FlippableCard'
import Logo from '../components/Logo'
import NextMeeting from '../NextMeetup/NextMeetup'
import { Stage } from '@pixi/react'
import Gravity from './Gravity'
import { ACCENT_COLOR } from '../constants'
import { useState } from 'react'
import Boids from './Boids'

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
  padding: 3vw;
  height: 75vh;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Header = () => {
  const possibleStageBackgrounds = [<Gravity />, <Boids />]

  const randomStage = useState(
    possibleStageBackgrounds[
      Math.floor(Math.random() * possibleStageBackgrounds.length)
    ]
  )[0]

  return (
    <StyledHeaderWrapper>
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
            <h1 style={{ fontSize: '3.75rem', margin: 0, color: ACCENT_COLOR }}>
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

      <Stage
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundAlpha: 0 }}>
        {randomStage}
      </Stage>
    </StyledHeaderWrapper>
  )
}

export default Header
