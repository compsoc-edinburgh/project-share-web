import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { DISCORD_INVITE_LINK } from '../constants'
import WavyText from '../components/WavyText'

const StyledNavbar = styled.div`
  border: 5px solid #7816f4;
  outline: 2px solid white;
  background: white;
  height: 50px;
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
  background-color: #efe2f5; // Or any color you prefer
  border-radius: 50px;
  z-index: -1; // Higher than other elements
  pointer-events: none; // Allow clicks to pass through
  transition: all 0.3s ease;
`

const NavbarItem = styled.b`
  cursor: pointer;
  color: black;
  user-select: none;
  text-decoration: none;
  font-style: bold;
  font-weight: 600;

  &:hover {
    color: black;
  }
`

const navBarRoutes = [
  {
    name: 'Home',
    path: '/',
  },
  { name: 'Team', path: '/team' },
  { name: 'About', path: '/about' },
]

const HoverBackground = ({ hoveredItem }: { hoveredItem: HTMLDivElement }) => {
  return (
    <Background
      initial={{
        width: hoveredItem.offsetWidth + 20,
        height: hoveredItem.offsetHeight + 5,
        x: hoveredItem.offsetLeft - 30,
        y: hoveredItem.offsetTop - 10,
        scale: 0.6,
        opacity: 0,
      }}
      animate={{
        width: hoveredItem.offsetWidth + 20,
        height: hoveredItem.offsetHeight + 5,
        x: hoveredItem.offsetLeft - 30,
        y: hoveredItem.offsetTop - 12,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.01 },
      }}
      exit={{
        opacity: 0,
        scale: 0.6,
      }}
    />
  )
}

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<HTMLDivElement | null>(null)

  const navigate = useNavigate()

  return (
    <StyledNavbar>
      <AnimatePresence>
        {hoveredItem && <HoverBackground hoveredItem={hoveredItem} />}
      </AnimatePresence>

      {navBarRoutes.map((route) => (
        <NavbarItem
          onClick={() => navigate(route.path)}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
            setHoveredItem(e.currentTarget)
          }
          onMouseLeave={() => setHoveredItem(null)}>
          {route.name}
        </NavbarItem>
      ))}
      <NavbarItem
        as="a"
        href={DISCORD_INVITE_LINK}
        onMouseEnter={(e: any) => setHoveredItem(e.currentTarget)}
        onMouseLeave={() => setHoveredItem(null)}>
        <WavyText text="Discord" />
      </NavbarItem>
    </StyledNavbar>
  )
}

export default Navbar
