import BackLink from '../components/BackLink'
import SketchLines from '../components/SketchLines'

function Team() {
  return (
    <>
      <code>/team</code>
      <BackLink />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
          color: 'black',
        }}>
        <SketchLines top bottom left right margin={30}>
          🚧 Coming soon... <br />
          Even sooner if you make a{' '}
          <a href="https://github.com/compsoc-edinburgh/project-share-web">
            PR
          </a>
        </SketchLines>
      </div>
    </>
  )
}

export default Team
