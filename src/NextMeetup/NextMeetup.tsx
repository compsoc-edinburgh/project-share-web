import styled from 'styled-components'
import { NEXT_MEETUP, SECONDARY_COLOR } from '../constants'

const StyledWrapper = styled.div`
  position: relative;
  margin: auto;
  color: ${SECONDARY_COLOR};
  display: flex;
  flex-direction: column;

  padding: 1rem;

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
  font-weight: 400;
  margin: 0;
`

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  font-size: 0.75rem;
  color: white;
  border: none;
  cursor: pointer;
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
  const eventEndTime = new Date(NEXT_MEETUP.date.getTime() + 60 * 60 * 1000)

  const eventURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${
    NEXT_MEETUP.title
  }&dates=${NEXT_MEETUP.date
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')}/${eventEndTime
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')}&location=${NEXT_MEETUP.location}&details=${
    NEXT_MEETUP.description
  }`

  return (
    <StyledWrapper>
      <StyledTitle>Next meet-up</StyledTitle>
      <StyledDetail>
        {formatDate(NEXT_MEETUP.date)}
        {' • '}
        {NEXT_MEETUP.date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
        {' • '}
        {NEXT_MEETUP.location}
      </StyledDetail>
      <StyledButton onClick={() => window.open(eventURL, '_blank')}>
        🗓️
      </StyledButton>
    </StyledWrapper>
  )
}

export default NextMeeting
