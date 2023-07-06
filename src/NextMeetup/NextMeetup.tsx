import styled from 'styled-components'
import { MAIN_COLOR, NEXT_MEETUP, SECONDARY_COLOR } from '../constants'

const StyledWrapper = styled.div`
  position: relative;
  margin: auto;
  color: ${SECONDARY_COLOR};
  display: flex;
  flex-direction: row;

  @keyframes highlightShimmer {
    0% {
      background-position: -100px 50;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: highlightShimmer;
  animation-timing-function: linear;
  z-index: -2;
  background: linear-gradient(
    120deg,
    rgba(0, 0, 0, 0) 25%,
    ${MAIN_COLOR}41 30%,
    rgba(0, 0, 0, 0) 35%
  );
  background-size: 1000px 1000px;
  height: 100%;
`

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`

const StyledDetail = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;

  color: ${SECONDARY_COLOR};
  border: 1px solid ${SECONDARY_COLOR};
  border-radius: 15px;
`

function formatDate(date: Date): string {
  const parsedDate = new Date(date)

  const dayNames = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
  const dayNumber = parsedDate.getDate()
  const dayName = dayNames[parsedDate.getDay()]
  const monthName = parsedDate.toLocaleString('default', { month: 'short' })

  const ordinal = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'],
      v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }

  return `${dayName} ${dayNumber}${ordinal(dayNumber)} ${monthName}`
}

const NextMeeting = () => {
  return (
    <StyledWrapper>
      <StyledTitle>
        Next <br />
        meet-up
      </StyledTitle>
      {/* <StyledDetail>{NEXT_MEETUP.description}</StyledDetail> */}
      <div>
        <StyledDetail>{formatDate(NEXT_MEETUP.date)}</StyledDetail>
        <StyledDetail>
          {NEXT_MEETUP.date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </StyledDetail>
        <StyledDetail>{NEXT_MEETUP.location}</StyledDetail>
      </div>
    </StyledWrapper>
  )
}

export default NextMeeting
