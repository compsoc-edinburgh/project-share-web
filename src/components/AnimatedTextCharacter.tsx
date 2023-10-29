import React from 'react'
import { motion } from 'framer-motion'

const AnimatedTextCharacter = ({ text }: { text: string }) => {
  // splitting text into letters
  const letters = Array.from(text)

  // Variants for Container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.01, delayChildren: 0.01 * i },
    }),
  }

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 0,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', fontSize: '1rem' }}
      variants={container}
      initial="hidden"
      animate="visible">
      <b>
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </b>
    </motion.div>
  )
}

export default AnimatedTextCharacter
