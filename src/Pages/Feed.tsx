import styled from 'styled-components'
import Navbar from '../Header/Navbar'
import Logo from '../components/Logo'
import SketchLines from '../components/SketchLines'
import Spacer from '../components/Spacer'
import { MAIN_COLOR } from '../constants'

const StyledMain = styled.div`
  position: relative;
  margin: auto;
  margin-top: 7rem;

  max-width: 768px;

  /* border: 1px solid ${MAIN_COLOR}; */
`

const Home = () => {
  return (
    <>
      <Logo size={126} />
      <Logo size={64} />
      <Logo size={32} />
      <Navbar />
      <StyledMain>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            Fugiat ut ullamco nostrud cupidatat eiusmod culpa sit eu quis aute
            sit do laborum deserunt. Commodo quis velit culpa qui. Officia dolor
            exercitation labore ipsum. Aute sunt tempor sint excepteur voluptate
            esse. Id magna cillum excepteur labore. Enim velit officia elit non
            aliquip consequat laborum eu labore eiusmod ipsum sit. Deserunt
            dolore magna laborum. Et ullamco do consectetur esse duis ex.
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? Officia dolor exercitation labore
            ipsum. Aute sunt tempor sint excepteur voluptate esse. Id magna
            cillum excepteur labore. Enim velit officia elit non aliquip
            consequat laborum eu labore eiusmod ipsum sit. Deserunt dolore magna
            laborum. Et ullamco do consectetur esse duis ex.
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet alskjdflk as;ldf asj dkfjak sjdf;
            consectetur adipisicing elit. Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
        <Spacer size={64} />
        <SketchLines top bottom>
          <p style={{ color: 'black', margin: 0 }}>
            HELLOO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod, voluptatum. Quam, voluptas? V
          </p>
        </SketchLines>
      </StyledMain>
      <SketchLines top bottom margin={1000}>
        <p style={{ color: 'black', margin: 0 }}>Footer</p>
      </SketchLines>
    </>
  )
}

export default Home
