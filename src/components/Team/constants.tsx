import { TeamMember, CommitteeYear, CommitteeData } from './types'

export const TEAM_MEMBERS: Record<string, Omit<TeamMember, 'position'>> = {
  danyilButov: {
    name: 'Danyil',
    surname: 'Butov',
    imageUrl: 'https://avatars.githubusercontent.com/u/89708817?v=4',
    signature:
      'M20,30 C40,20 60,40 80,30 C100,20 120,40 140,30 C160,20 180,40 200,30',
    links: [
      { label: 'GitHub', url: 'https://github.com/HJyup' },
      { label: 'Website', url: 'https://danyilbutov.com/' },
    ],
  },
  kay: {
    name: 'Kay',
    surname: '',
    imageUrl: 'https://avatars.githubusercontent.com/u/60564130?v=4',
    signature:
      'M20,30 C40,20 60,40 80,30 C100,20 120,40 140,30 C160,20 180,40 200,30',
    links: [{ label: 'Website', url: 'https://blog.itskay.co/' }],
  },
  tomasMaillo: {
    name: 'Tomas',
    surname: 'Maillo',
    imageUrl: 'https://avatars.githubusercontent.com/u/38633386?v=4',
    signature:
      'm36.5 240.5c15-14 111.68-81.748 114.5-84 2.5-2 88.879-55.934 94.5-59 5.5-3 60.5-30 63.5-31.5s43.5-18 47-20 25.5-8.5 26.5-11-2.5-3.5-6.5-2.5c-3.43 0.8576-13.5 3.5001-23.5 7.5-10 4-36 17.5-44.5 19s-11.5-1.5-15.5-4.5c-4.252-3.1891-7-7-11-7.5s-11.5 8.5-15 12-12 12.5-17.5 12.5c-6.325 0-5.626-5.5021-6.5-9-1-4.0001-0.5-10-2-10.5s-6 5-9.5 10.5-13.5 18-22 18c-8.631 0-12.719-16.056-18-15-5 1-4 4-9.5 13s-11 13-14.5 10c-3.438-2.9466-7.5-24-6.5-14.5 0.8 7.6-8.333 16.167-13 19.5-7.5 6.5-17 7-19.5 1.9999-2.5-4.9999 3.5-13.5 2-15.5-1.5-2-3 2.0001-5.5 7.0001s-5.5 6.5-11 11c-5.5 4.5001-14 3.5001-17.5 2.0001s-3.5-9-2-13 2.5-7.0001 5.5-9.5001c1.8-1.4999 7.5-0.5 8.5 2.5 1.333 4.0001-11 13.5-14 15.5-2.4 1.6-16.333 12-23 17-5 4.5-11.818 6.5-16.817 1.5-5.1827-5.183-1.3038-13.089 0-17 1.8334-5.5 5.8173-18.5 8.3173-28 1.8917-7.1883 4-39 27.5-53.5 23.5-14.5 154-8.0002 152.5-2e-4 -1.5 8-171.5 59.5-241.5 67',
    links: [
      { label: 'GitHub', url: 'https://github.com/tomasmaillo' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/tomas-maillo' },
    ],
  },
  stanFlint: {
    name: 'Stan',
    surname: 'Flint',
    imageUrl: 'https://avatars.githubusercontent.com/u/38284426?v=4',
    signature: '',
    links: [
      { label: 'GitHub', url: 'https://github.com/stanflint' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/stanflint' },
    ],
  },
  vojtechJanovec: {
    name: 'Vojtech',
    surname: 'Janovec',
    imageUrl: 'https://avatars.githubusercontent.com/u/41960738?v=4',
    signature:
      'M20,30 C40,20 60,40 80,30 C100,20 120,40 140,30 C160,20 180,40 200,30',
    links: [
      { label: 'GitHub', url: 'https://github.com/vjanovec' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/vjanovec' },
    ],
  },
  kyleWinn: {
    name: 'Kyle',
    surname: 'Winn',
    imageUrl: 'https://avatars.githubusercontent.com/u/70538229?v=4',
    signature:
      'M20,30 C40,20 60,40 80,30 C100,20 120,40 140,30 C160,20 180,40 200,30',
    links: [
      { label: 'GitHub', url: 'https://github.com/Kyle-Winn' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/kyle-winn' },
    ],
  },
}

export const COMMITTEE_DATA: Record<CommitteeYear, CommitteeData> = {
  '2025': {
    year: '2025-2026',
    subtitle: <>The year of the hackathon.</>,
    members: [
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'President' },
      { ...TEAM_MEMBERS.danyilButov, position: 'Committee' },
      { ...TEAM_MEMBERS.kay, position: 'Committee' },
      { ...TEAM_MEMBERS.kyleWinn, position: 'Committee' },
    ],
  },
  '2024': {
    year: '2024-2025',
    subtitle: (
      <>
        A massive year of growth for the society! First time running the Project
        Share Awards Night and also partnered with{' '}
        <a
          href="https://edinburghventurepoint.com/"
          target="_blank"
          rel="noopener noreferrer">
          Edinburgh Venture Point
        </a>{' '}
        to run the annual hackathon.
      </>
    ),
    members: [
      { ...TEAM_MEMBERS.tomasMaillo, position: 'President' },
      { ...TEAM_MEMBERS.stanFlint, position: 'Events Officer' },
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'Committee' },
    ],
  },
  '2023': {
    year: '2023-2024',
    subtitle: <>Our founding committee that started it all.</>,
    members: [
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'President' },
      { ...TEAM_MEMBERS.tomasMaillo, position: 'Committee' },
      { ...TEAM_MEMBERS.kyleWinn, position: 'Committee' },
    ],
  },
  '2022': {
    year: '2022-2023',
    subtitle: <>The original team that laid the foundation.</>,
    members: [
      { ...TEAM_MEMBERS.stanFlint, position: 'Committee' },
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'Committee' },
      { ...TEAM_MEMBERS.tomasMaillo, position: 'Committee' },
      { ...TEAM_MEMBERS.kyleWinn, position: 'Committee' },
    ],
  },
}
