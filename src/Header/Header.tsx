import styled from 'styled-components'
import FlippableCard from '../components/FlippableCard'
import Logo from '../components/Logo'
import NextMeeting from '../NextMeetup/NextMeetup'

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
`

const Header = () => {
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
            <h1 style={{ fontSize: '3.75rem', margin: 0 }}>
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
    </StyledHeaderWrapper>
  )
}

export default Header
