import React, { useState, useEffect } from 'react'
import { Container, Graphics, useApp, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { ACCENT_COLOR } from '../constants'

interface Vector {
  x: number
  y: number
}

interface Boid {
  position: Vector
  velocity: Vector
}

const BOID_COUNT = 50
const VIEW_RADIUS = 50
const MAX_SPEED = 5
const SEPARATION_DISTANCE = 50
const ALIGNMENT_RADIUS = 50
const COHESION_RADIUS = 50
const BOID_SIZE = 10

const Boids: React.FC = () => {
  const [boids, setBoids] = useState<Boid[]>([])

  const app = useApp()

  const stageMargin = 50

  useEffect(() => {
    const initialBoids: Boid[] = new Array(BOID_COUNT).fill(null).map(() => ({
      position: {
        x: Math.random() * app.screen.width,
        y: Math.random() * app.screen.height,
      },
      velocity: {
        x: Math.random() * MAX_SPEED - MAX_SPEED / 2,
        y: Math.random() * MAX_SPEED - MAX_SPEED / 2,
      },
    }))

    setBoids(initialBoids)
  }, [])

  const addVectors = (v1: Vector, v2: Vector): Vector => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  })

  const multiplyVector = (v: Vector, scalar: number): Vector => ({
    x: v.x * scalar,
    y: v.y * scalar,
  })

  const limitVector = (v: Vector, max: number): Vector => {
    const magnitude = Math.sqrt(v.x * v.x + v.y * v.y)
    if (magnitude > max) {
      return multiplyVector(v, max / magnitude)
    }
    return v
  }

  const separation = (boid: Boid, neighbors: Boid[]): Vector => {
    let steer: Vector = { x: 0, y: 0 }
    let total = 0
    neighbors.forEach((other) => {
      const distance = Math.sqrt(
        Math.pow(boid.position.x - other.position.x, 2) +
          Math.pow(boid.position.y - other.position.y, 2)
      )
      if (distance < SEPARATION_DISTANCE && distance > 0) {
        const diff: Vector = {
          x: boid.position.x - other.position.x,
          y: boid.position.y - other.position.y,
        }
        steer = addVectors(steer, diff)
        total++
      }
    })
    if (total > 0) {
      steer = multiplyVector(steer, 1 / total)
    }
    return steer
  }

  const alignment = (boid: Boid, neighbors: Boid[]): Vector => {
    let averageVel: Vector = { x: 0, y: 0 }
    neighbors.forEach((other) => {
      averageVel = addVectors(averageVel, other.velocity)
    })
    if (neighbors.length > 0) {
      averageVel = multiplyVector(averageVel, 1 / neighbors.length)
      return limitVector(averageVel, MAX_SPEED)
    }
    return boid.velocity
  }

  const cohesion = (boid: Boid, neighbors: Boid[]): Vector => {
    let centerOfMass: Vector = { x: 0, y: 0 }
    neighbors.forEach((other) => {
      centerOfMass = addVectors(centerOfMass, other.position)
    })
    if (neighbors.length > 0) {
      centerOfMass = multiplyVector(centerOfMass, 1 / neighbors.length)
      return {
        x: centerOfMass.x - boid.position.x,
        y: centerOfMass.y - boid.position.y,
      }
    }
    return { x: 0, y: 0 }
  }

  const getNeighbors = (boid: Boid, radius: number): Boid[] => {
    return boids.filter((other) => {
      const distance = Math.sqrt(
        Math.pow(boid.position.x - other.position.x, 2) +
          Math.pow(boid.position.y - other.position.y, 2)
      )
      return distance < radius && distance > 0
    })
  }

  useTick((delta) => {
    const newBoids = boids.map((boid) => {
      const neighbors = getNeighbors(boid, VIEW_RADIUS)

      // Apply behaviors
      const sep = separation(boid, getNeighbors(boid, SEPARATION_DISTANCE))
      const ali = alignment(boid, getNeighbors(boid, ALIGNMENT_RADIUS))
      const coh = cohesion(boid, getNeighbors(boid, COHESION_RADIUS))

      // Adjust velocity
      boid.velocity = addVectors(boid.velocity, sep)
      boid.velocity = addVectors(boid.velocity, ali)
      boid.velocity = addVectors(boid.velocity, coh)
      boid.velocity = limitVector(boid.velocity, MAX_SPEED)

      // Update position and apply wrap-around
      const newPosition = {
        x: boid.position.x + boid.velocity.x * delta,
        y: boid.position.y + boid.velocity.y * delta,
      }

      // Wrap-around logic for x-coordinate
      if (newPosition.x < -stageMargin) {
        newPosition.x = app.screen.width + stageMargin
      } else if (newPosition.x > app.screen.width + stageMargin) {
        newPosition.x = -stageMargin
      }

      // Wrap-around logic for y-coordinate
      if (newPosition.y < -stageMargin) {
        newPosition.y = app.screen.height + stageMargin
      } else if (newPosition.y > app.screen.height + stageMargin) {
        newPosition.y = -stageMargin
      }

      return {
        ...boid,
        position: newPosition,
      }
    })

    setBoids(newBoids)
  })

  const drawTriangle = (
    g: PIXI.Graphics,
    x: number,
    y: number,
    size: number,
    rotation: number
  ) => {
    g.drawPolygon([
      x - size,
      y + size, // Left corner
      x + size,
      y + size, // Right corner
      x,
      y - size, // Top corner
    ])
    g.rotation = rotation
  }

  const color = new PIXI.Color(ACCENT_COLOR)

  return (
    <Container>
      {boids.map((boid, index) => (
        <Graphics
          key={index}
          draw={(g) => {
            g.clear()
            g.beginFill(color) // Purple color
            const rotation =
              Math.atan2(boid.velocity.y, boid.velocity.x) + Math.PI / 2
            drawTriangle(g, 0, 0, BOID_SIZE, rotation) // Draw each boid as a triangle
            g.endFill()
          }}
          x={boid.position.x}
          y={boid.position.y}
        />
      ))}
    </Container>
  )
}

export default Boids
