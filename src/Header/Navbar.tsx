import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { styled } from 'styled-components'

const StyledNavbar = styled.div`
  border: 5px solid #7816f4;
  outline: 2px solid white;
  background: white;
  height: 5vh;
  width: min-contents;
  margin: auto;
  margin-top: 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: fixed;
  padding: 0 1.25rem 0 1.25rem;
  bottom: 1vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`
const Background = styled(motion.div)`
  position: absolute;
  background-color: #7816f4; // Or any color you prefer
  border-radius: 50px;
  mix-blend-mode: difference;
  z-index: 101; // Higher than other elements
  pointer-events: none; // Allow clicks to pass through
  transition: all 0.3s ease;
`

const NavbarItem = styled.b`
  cursor: pointer;
`

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<HTMLDivElement | null>(null)

  return (
    <StyledNavbar>
      <AnimatePresence>
        {hoveredItem && (
          <Background
            initial={{
              width: hoveredItem.offsetWidth + 20,
              height: hoveredItem.offsetHeight + 5,
              x: hoveredItem.offsetLeft - 30,
              y: hoveredItem.offsetTop - 5,
              scale: 0.6,
              opacity: 0,
            }}
            animate={{
              width: hoveredItem.offsetWidth + 20,
              height: hoveredItem.offsetHeight + 5,
              x: hoveredItem.offsetLeft - 30,
              y: hoveredItem.offsetTop - 10,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.01 },
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
            }}
          />
        )}
      </AnimatePresence>
      <NavbarItem
        onMouseEnter={(e: any) => setHoveredItem(e.currentTarget)}
        onMouseLeave={() => setHoveredItem(null)}>
        Home
      </NavbarItem>
      <NavbarItem
        onMouseEnter={(e: any) => setHoveredItem(e.currentTarget)}
        onMouseLeave={() => setHoveredItem(null)}>
        Team
      </NavbarItem>
      <NavbarItem
        onMouseEnter={(e: any) => setHoveredItem(e.currentTarget)}
        onMouseLeave={() => setHoveredItem(null)}>
        Discord
      </NavbarItem>
    </StyledNavbar>
  )
}

export default Navbar
