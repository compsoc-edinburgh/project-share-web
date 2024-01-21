import React, { useState, useEffect } from 'react'
import { Container, useTick, Graphics, useApp } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { ACCENT_COLOR } from '../constants'

interface Vector {
  x: number
  y: number
}

interface Planet {
  position: Vector
  velocity: Vector
  mass: number
}

const G = 6.6743e-7 // Gravitational constant

const Gravity: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([])

  const app = useApp()

  const STAGE_MARGIN = 50 // Margin from the edge of the screen so when wrapping around the screen, the planet doesn't suddenly get cut off

  const MAX_VEL = 5

  useEffect(() => {
    const initialPlanets: Planet[] = new Array(50).fill(0).map(() => {
      const x = Math.random() * app.screen.width
      const y = Math.random() * app.screen.height
      const mass = Math.random() * 10000000
      const velocity = {
        x: Math.random() * 1 - 0.5,
        y: Math.random() * 1 - 0.5,
      }
      return {
        position: { x, y },
        velocity,
        mass,
      }
    })

    setPlanets(initialPlanets)
  }, [])

  const calculateGravitationalForce = (
    planet1: Planet,
    planet2: Planet
  ): Vector => {
    const dx = planet2.position.x - planet1.position.x
    const dy = planet2.position.y - planet1.position.y
    let distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 10) {
      distance = 15
    }

    const force = (G * (planet1.mass * planet2.mass)) / (distance * distance)
    return {
      x: (force * dx) / distance,
      y: (force * dy) / distance,
    }
  }

  useTick((delta) => {
    const newPlanets = planets.map((planet, index) => {
      let forceX = 0
      let forceY = 0

      planets.forEach((otherPlanet, otherIndex) => {
        if (index !== otherIndex) {
          const force = calculateGravitationalForce(planet, otherPlanet)
          forceX += force.x
          forceY += force.y
        }
      })

      const newVelocity = {
        x: planet.velocity.x + (forceX / planet.mass) * delta,
        y: planet.velocity.y + (forceY / planet.mass) * delta,
      }

      if (newVelocity.x > MAX_VEL) {
        newVelocity.x = MAX_VEL
      } else if (newVelocity.x < -MAX_VEL) {
        newVelocity.x = -MAX_VEL
      }

      if (newVelocity.y > MAX_VEL) {
        newVelocity.y = MAX_VEL
      } else if (newVelocity.y < -MAX_VEL) {
        newVelocity.y = -MAX_VEL
      }

      const newPosition = {
        x: planet.position.x + newVelocity.x * delta,
        y: planet.position.y + newVelocity.y * delta,
      }

      if (newPosition.x < -STAGE_MARGIN) {
        newPosition.x = app.screen.width + STAGE_MARGIN
      }

      if (newPosition.x > app.screen.width + STAGE_MARGIN) {
        newPosition.x = -STAGE_MARGIN
      }

      if (newPosition.y < -STAGE_MARGIN) {
        newPosition.y = app.screen.height + STAGE_MARGIN
      }

      if (newPosition.y > app.screen.height + STAGE_MARGIN) {
        newPosition.y = -STAGE_MARGIN
      }

      return {
        ...planet,
        position: newPosition,
        velocity: newVelocity,
      }
    })

    setPlanets(newPlanets)
  })

  const color = new PIXI.Color(ACCENT_COLOR)

  return (
    <Container
      interactive
      hitArea={new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height)}
      onmousedown={(e) => {
        console.log(e.data.global.x, e.data.global.y)
        setPlanets([
          ...planets,
          {
            position: { x: e.data.global.x, y: e.data.global.y },
            velocity: {
              x: Math.random() * 1 - 0.5,
              y: Math.random() * 1 - 0.5,
            },
            mass: Math.random() * 10000000,
          },
        ])
      }}>
      {planets.map((planet, index) => (
        <Graphics
          key={index}
          draw={(g) => {
            g.clear()
            g.beginFill(color) // Purple color in hex
            g.drawCircle(0, 0, planet.mass / 500000) // Draw circle with radius 20
            g.endFill()
          }}
          x={planet.position.x}
          y={planet.position.y}
        />
      ))}
    </Container>
  )
}

export default Gravity
