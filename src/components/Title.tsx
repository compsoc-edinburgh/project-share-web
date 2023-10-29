import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import FlippableCard from './FlippableCard'
import NextMeeting from '../NextMeetup/NextMeetup'
import Logo from './Logo'
import Navbar from './Navbar'
import Header from '../Header/Header'

const Title = () => {
  const [isMerged, setIsMerged] = useState(false)

  const toggleMerge = () => {
    setTimeout(() => setIsMerged(!isMerged), 100)
  }

  return (
    <motion.div /* ... any necessary props or styles */>
      <AnimatePresence>
        {isMerged ? (
          <Navbar key="unique" />
        ) : (
          <FlippableCard
            key="unique"
            frontContent={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Logo size={200} />
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
        )}
      </AnimatePresence>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </motion.div>
  )
}

export default Title
