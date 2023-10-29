import FlippableCard from './FlippableCard'
import NextMeeting from '../NextMeetup/NextMeetup'
import Logo from './Logo'
import Header from '../Header/Header'

const Title = () => {
  return (
    <FlippableCard
      key="unique"
      frontContent={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          }}>
          <Logo size={140} />
          <Header />
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
  )
}

export default Title
