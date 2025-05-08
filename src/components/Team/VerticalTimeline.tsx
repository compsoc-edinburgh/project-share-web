import { useRef, useEffect } from 'react'
import { CommitteeYear } from './types'
import {
  TimelineContainer,
  TimelineSVG,
  TimelinePath,
  TimelineDot,
  TimelineText,
} from './styles'

interface VerticalTimelineProps {
  selectedYear: CommitteeYear
  onYearChange: (year: CommitteeYear) => void
  years: CommitteeYear[]
}

export const VerticalTimeline = ({
  selectedYear,
  onYearChange,
  years,
}: VerticalTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedDotRef = useRef<SVGCircleElement>(null)

  const getYearPosition = (year: CommitteeYear) => {
    const index = years.indexOf(year)
    return index * (400 / (years.length - 1))
  }

  useEffect(() => {
    if (selectedDotRef.current) {
      const newY = 50 + getYearPosition(selectedYear)
      selectedDotRef.current.style.transform = `translateY(${newY - 50}px)`
    }
  }, [selectedYear, years])

  return (
    <TimelineContainer ref={containerRef}>
      <TimelineSVG viewBox="0 0 100 500">
        {/* Background line */}
        <TimelinePath d="M50,50 L50,450" />

        {/* Year dots and labels */}
        {years.map((year) => (
          <g
            key={year}
            onClick={() => onYearChange(year)}
            style={{ cursor: 'pointer' }}>
            <TimelineDot
              cx="50"
              cy={50 + getYearPosition(year)}
              isSelected={false}
            />
            <TimelineText x="84" y={50 + getYearPosition(year) + 5}>
              {year}
            </TimelineText>
          </g>
        ))}

        {/* Selected dot that moves - placed last to appear on top */}
        <TimelineDot
          ref={selectedDotRef}
          cx="50"
          cy="50"
          isSelected={true}
          style={{
            transition: 'transform 0.3s ease-in-out',
            transform: 'translateY(0)',
          }}
        />
      </TimelineSVG>
    </TimelineContainer>
  )
}
