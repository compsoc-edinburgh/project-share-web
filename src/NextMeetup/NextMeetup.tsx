import styled from 'styled-components'
import {
  DISCORD_INVITE_LINK,
  NEXT_MEETUP,
  SECONDARY_COLOR,
  MeetupDetails,
} from '../constants'
import Dot from '../components/Dot'
import BouncingEllipsis from '../components/BouncingEllipsis'

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

const generateGoogleCalendarLink = (meetup: MeetupDetails) => {
  const eventEndTime = new Date(meetup.date.getTime() + 60 * 60 * 1000)

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${
    meetup.title
  }&dates=${meetup.date
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')}/${eventEndTime
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')}&location=${meetup.location}&details=${
    meetup.description
  }`

  return googleCalendarLink
}

const NextMeeting = () => {
  if (!NEXT_MEETUP) return <NextMeetingIsTBC />

  // if next meetup is more than 3 hours in the past
  if (NEXT_MEETUP.date < new Date(Date.now() - 3 * 60 * 60 * 1000))
    return <NextMeetingIsTBC />

  const eventGCalURL = generateGoogleCalendarLink(NEXT_MEETUP)

  const eventDate = formatDate(NEXT_MEETUP.date)
  const eventTime = NEXT_MEETUP.date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const eventLocation = NEXT_MEETUP.location

  return (
    <StyledWrapper>
      <StyledTitle>
        Next meet-up
        <BouncingEllipsis />
      </StyledTitle>
      <StyledDetail>
        {eventDate}
        <Dot />
        {eventTime}
        <Dot />
        {eventLocation}
      </StyledDetail>
      <StyledButton onClick={() => window.open(eventGCalURL, '_blank')}>
        🗓️
      </StyledButton>
    </StyledWrapper>
  )
}

export default NextMeeting
