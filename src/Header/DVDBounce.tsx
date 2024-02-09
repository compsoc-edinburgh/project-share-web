import React, { useState, useEffect } from 'react'
import { Container, Sprite, useApp, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'

const LOGO_PATH = '/media/logos/project-share-dark.png'
const LOGO_COUNT = 10
const LOGO_SIZE = { width: 100, height: 100 } // Adjust based on actual logo size
const SPEED_RANGE = { min: 1, max: 2 }

interface Vector {
  x: number
  y: number
}

interface DVDLogo {
  position: Vector
  velocity: Vector
  hue: number
}

const DVDBounce: React.FC = () => {
  const [logos, setLogos] = useState<DVDLogo[]>([])
  const app = useApp()

  useEffect(() => {
    const initialLogos: DVDLogo[] = new Array(LOGO_COUNT)
      .fill(null)
      .map(() => ({
        position: {
          x: Math.random() * (app.screen.width - LOGO_SIZE.width),
          y: Math.random() * (app.screen.height - LOGO_SIZE.height),
        },
        velocity: {
          x:
            (Math.random() > 0.5 ? 1 : -1) *
            (Math.random() * (SPEED_RANGE.max - SPEED_RANGE.min) +
              SPEED_RANGE.min),
          y:
            (Math.random() > 0.5 ? 1 : -1) *
            (Math.random() * (SPEED_RANGE.max - SPEED_RANGE.min) +
              SPEED_RANGE.min),
        },
        hue: Math.random() * 360,
      }))

    setLogos(initialLogos)
  }, [])

  const bounceLogo = (logo: DVDLogo): DVDLogo => {
    let newX = logo.position.x + logo.velocity.x
    let newY = logo.position.y + logo.velocity.y
    let newHue = logo.hue

    // Bounce off walls
    if (newX <= 0 || newX + LOGO_SIZE.width >= app.screen.width) {
      logo.velocity.x *= -1
      newHue = (newHue + 45) % 360 // Change hue
    }
    if (newY <= 0 || newY + LOGO_SIZE.height >= app.screen.height) {
      logo.velocity.y *= -1
      newHue = (newHue + 45) % 360 // Change hue
    }

    // Adjust position
    newX = Math.max(0, Math.min(app.screen.width - LOGO_SIZE.width, newX))
    newY = Math.max(0, Math.min(app.screen.height - LOGO_SIZE.height, newY))

    return {
      ...logo,
      position: { x: newX, y: newY },
      hue: newHue,
    }
  }

  useTick(() => {
    const newLogos = logos.map(bounceLogo)
    setLogos(newLogos)
  })

  return (
    <Container>
      {logos.map((logo, index) => (
        <Sprite
          key={index}
          texture={PIXI.Texture.from(LOGO_PATH)}
          x={logo.position.x}
          y={logo.position.y}
          width={LOGO_SIZE.width}
          height={LOGO_SIZE.height}
          tint={PIXI.utils.string2hex(`hsl(${logo.hue}, 100%, 50%)`)}
        />
      ))}
    </Container>
  )
}

export default DVDBounce
