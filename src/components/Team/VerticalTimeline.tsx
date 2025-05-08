import { useRef } from 'react'
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

  const getYearPosition = (year: CommitteeYear) => {
    const index = years.indexOf(year)
    return index * (400 / (years.length - 1))
  }

  return (
    <TimelineContainer ref={containerRef}>
      <TimelineSVG viewBox="0 0 100 500">
        {/* Background line */}
        <TimelinePath d="M50,50 L50,450" />

        {/* Year dots and labels */}
        {years.map((year) => (
          <g key={year} onClick={() => onYearChange(year)}>
            <TimelineDot
              cx="50"
              cy={50 + getYearPosition(year)}
              isSelected={selectedYear === year}
            />
            <TimelineText x="84" y={50 + getYearPosition(year) + 5}>
              {year}
            </TimelineText>
          </g>
        ))}
      </TimelineSVG>
    </TimelineContainer>
  )
}
