import Logo from '../components/Logo'
import SketchLines from '../components/SketchLines'
import Spacer from '../components/Spacer'
import styled from 'styled-components'
import { ACCENT_COLOR } from '../constants'
import { useState } from 'react'
import BackLink from '../components/BackLink'

const StyledComponentShowcase = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  background-color: ${ACCENT_COLOR}07;
  padding: 1.5rem 1rem;
`

const StyledComponentExplanation = styled.div`
  background-color: ${ACCENT_COLOR}11;
  padding: 1rem;
  margin-top: 1rem;
  color: black;
  border-radius: 15px;
`

const Components = () => {
  const [spacerSize, setSpacerSize] = useState(32)
  const [marginSize, setMarginSize] = useState(20)
  const [lines, setLines] = useState({
    top: true,
    bottom: false,
    left: false,
    right: true,
  })

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacerSize(Number(event.target.value))
  }

  const handleMarginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarginSize(Number(event.target.value))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLines({ ...lines, [event.target.name]: event.target.checked })
  }
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
      }}>
      <h2>
        <code>/components</code>
      </h2>

      <BackLink />

      <p style={{ color: 'black' }}>
        Welcome to another authentic glimpse behind the scenes at Project Share,
        this time featuring the creation of our official website.
      </p>
      <p style={{ color: 'black' }}>
        The birth and evolution of our website design happened in{' '}
        <a href="https://www.figma.com/file/vhS6jQg7AZqairor9605tD/Project-Share?type=design&node-id=0%3A1&mode=design&t=Uu41nLw9ywAohVIU-1">
          Figma
        </a>
        . Check it out!
      </p>
      <p style={{ color: 'black' }}>
        Built with React, TypeScript, and Vite, with the help of
        styled-components and react-router-dom libraries. Curious to learn more?{' '}
        <a href="https://github.com/compsoc-edinburgh/project-share-web">
          Check out our GitHub repo
        </a>
        .
      </p>
      <p style={{ color: 'black' }}>
        Lastly, here's a breakdown of each component that makes up this website.
        This includes not just the final product but also our challenges,
        solutions, and the inner workings that bring the magic to life!
      </p>

      <br />

      <StyledComponentShowcase>
        <code>{'<SketchLines />'}</code>
        <br />

        <SketchLines
          top={lines.top}
          bottom={lines.bottom}
          left={lines.left}
          right={lines.right}
          margin={marginSize}>
          <p style={{ color: 'black', margin: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod,
            voluptatum.
          </p>
        </SketchLines>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            alignItems: 'center',
            gap: '16px',
            marginTop: '16px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
            }}>
            <label>
              Top:
              <input
                type="checkbox"
                name="top"
                checked={lines.top}
                onChange={handleCheckboxChange}
              />
            </label>
            <label>
              Bottom:
              <input
                type="checkbox"
                name="bottom"
                checked={lines.bottom}
                onChange={handleCheckboxChange}
              />
            </label>
            <label>
              Left:
              <input
                type="checkbox"
                name="left"
                checked={lines.left}
                onChange={handleCheckboxChange}
              />
            </label>
            <label>
              Right:
              <input
                type="checkbox"
                name="right"
                checked={lines.right}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <label>
            Margin:
            <input
              type="range"
              min="0"
              max="200"
              value={marginSize}
              onChange={handleMarginChange}
            />
          </label>
        </div>

        <StyledComponentExplanation>
          The Sketchlines are essential for the design of our website. They
          convey the state of the partially built website and what you are
          allowed to see.
          <br />
          It was built with two inline <code>{'<div />'}</code> wrapping the
          main content. Each of them has custom borders and can scale along
          either the x or y axis. They can't be combined as the skewing would
          mess with the thickness of the border.
        </StyledComponentExplanation>
      </StyledComponentShowcase>

      <StyledComponentShowcase>
        <code>{'<Spacer />'}</code>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
          <Spacer size={spacerSize} />
          <Spacer size={spacerSize} direction="horizontal" />
        </div>

        <br />

        <input
          type="range"
          min="16"
          max="128"
          value={spacerSize}
          onChange={handleSliderChange}
        />

        <StyledComponentExplanation>
          We were somewhat lost when starting out with this component. In the
          end, we based the main design on a <code>.svg</code> drawing in Figma.
          Then we copied the code and painstakingly identified the coordinates
          that allowed the drawing to stretch without deforming.
        </StyledComponentExplanation>
      </StyledComponentShowcase>

      <StyledComponentShowcase>
        <code>{'<Logo />'}</code>
        <br />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
          <Logo size={126} />
          <Logo size={64} />
          <Logo size={32} />
        </div>
      </StyledComponentShowcase>

      <p style={{ color: 'black' }}>
        Did you enjoy this behind-the-scenes chat about the project? Join us!
      </p>
      <p style={{ color: 'black' }}>
        And as always, the value of Project Share is to share knowledge and
        inspiration. Here's to the next project!
      </p>

      <BackLink />
    </div>
  )
}

export default Components
