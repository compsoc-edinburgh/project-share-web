import { useState } from 'react'
import {
  Background,
  Page,
  ContentWrapper,
  CommitteeSection,
  TeamGrid,
} from '../components/Team/styles'
import { VerticalTimeline } from '../components/Team/VerticalTimeline'
import { Profile } from '../components/Team/Profile'
import { COMMITTEE_DATA } from '../components/Team/constants'
import { CommitteeYear } from '../components/Team/types'

function Team() {
  const years = Object.keys(COMMITTEE_DATA) as CommitteeYear[]
  const [selectedYear, setSelectedYear] = useState<CommitteeYear>(years[0])

  const scrollToYear = (year: CommitteeYear) => {
    const element = document.getElementById(`year-${year}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleYearClick = (year: CommitteeYear) => {
    setSelectedYear(year)
    scrollToYear(year)
  }

  return (
    <Background>
      <VerticalTimeline
        selectedYear={selectedYear}
        onYearChange={handleYearClick}
        years={years}
      />
      <Page>
        <ContentWrapper>
          {years.map((year) => (
            <CommitteeSection key={year} id={`year-${year}`}>
              <TeamGrid>
                <h2 style={{ margin: '0' }}>{COMMITTEE_DATA[year].year}</h2>
                <p style={{ margin: '0' }}>{COMMITTEE_DATA[year].subtitle}</p>
                {COMMITTEE_DATA[year].members.map((member, index) => (
                  <Profile key={index} {...member} />
                ))}
              </TeamGrid>
            </CommitteeSection>
          ))}
        </ContentWrapper>
      </Page>

      <p style={{ textAlign: 'center', opacity: 0.5, color: 'black' }}>
        Want to join the committee? Just let us know!
      </p>
      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </Background>
  )
}

export default Team
