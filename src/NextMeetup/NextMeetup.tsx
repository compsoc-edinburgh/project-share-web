import styled from 'styled-components'
import { DISCORD_INVITE_LINK, NEXT_MEETUP, SECONDARY_COLOR } from '../constants'
import Dot from '../components/Dot'
import BouncingEllipsis from '../components/BouncingEllipsis'
import { useEffect, useState } from 'react'
import NumberFlipper from './NumberFlipper'
import WavyText from '../components/WavyText'

const StyledWrapper = styled.div`
  position: relative;
  margin: auto;
  color: ${SECONDARY_COLOR};

  height: 100%;
`

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  user-select: none;
`

const StyledDetail = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NextMeetingIsTBC = () => (
  <StyledWrapper>
    <StyledTitle>
      Next meet-up
      <BouncingEllipsis />
    </StyledTitle>
    <StyledDetail>
      TBC
      <Dot />
      Check <a href={DISCORD_INVITE_LINK}>Discord</a> soon!
    </StyledDetail>
  </StyledWrapper>
)

const NextMeeting = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    if (!NEXT_MEETUP) return

    const updateTimeLeft = () => {
      if (!NEXT_MEETUP) return
      const timeDiff = NEXT_MEETUP.date.getTime() - new Date().getTime()
      setTimeLeft(timeDiff > 0 ? timeDiff : null)
    }

    const interval = setInterval(updateTimeLeft, 100)
    updateTimeLeft()

    return () => clearInterval(interval)
  }, [NEXT_MEETUP])

  if (!NEXT_MEETUP || timeLeft === null) return <NextMeetingIsTBC />

  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return (
    <StyledWrapper>
      <StyledDetail>
        <div
          style={{
            fontSize: '1.5rem',
            margin: 0,
            lineHeight: 1.4,
            userSelect: 'none',
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <WavyText text="Next" />
          <WavyText text="meet-up" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column',
          }}>
          <span>{NEXT_MEETUP.location}</span>
          <span>
            {NEXT_MEETUP.date.toLocaleDateString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5ch',
            }}>
            <NumberFlipper value={hours} precision={hours.toString().length} />{' '}
            hrs
            <NumberFlipper value={minutes} precision={2} /> min
            <NumberFlipper value={seconds} precision={2} /> sec
          </div>
        </div>
      </StyledDetail>
    </StyledWrapper>
  )
}

export default NextMeeting
