import { motion } from 'framer-motion'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
  position: sticky;
  width: 500px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  position: absolute;

  transition: 0.2s box-shadow;
  border: 5px solid #7816f4;
  background: white;
`

const Navbar = ({ key }: { key: string }) => {
  return (
    <Wrapper
      key={key}
      layout
      layoutId={`${key}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div>
        <motion.p initial={{ x: -10 }} animate={{ x: 0 }} exit={{ x: 100 }}>
          Next meet-up • Weds 25th Oct • AT_2.11 • 11hrs 5mins 3secs
        </motion.p>
      </div>
    </Wrapper>
  )
}

export default Navbar
