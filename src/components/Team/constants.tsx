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
    signature: [
      {
        path: 'm36.5 240.5c15-14 111.68-81.748 114.5-84 2.5-2 88.879-55.934 94.5-59 5.5-3 60.5-30 63.5-31.5s43.5-18 47-20 25.5-8.5 26.5-11-2.5-3.5-6.5-2.5c-3.43 0.8576-13.5 3.5001-23.5 7.5-10 4-36 17.5-44.5 19s-11.5-1.5-15.5-4.5c-4.252-3.1891-7-7-11-7.5s-11.5 8.5-15 12-12 12.5-17.5 12.5c-6.325 0-5.626-5.5021-6.5-9-1-4.0001-0.5-10-2-10.5s-6 5-9.5 10.5-13.5 18-22 18c-8.631 0-12.719-16.056-18-15-5 1-4 4-9.5 13s-11 13-14.5 10c-3.438-2.9466-7.5-24-6.5-14.5 0.8 7.6-8.333 16.167-13 19.5-7.5 6.5-17 7-19.5 1.9999-2.5-4.9999 3.5-13.5 2-15.5-1.5-2-3 2.0001-5.5 7.0001s-5.5 6.5-11 11c-5.5 4.5001-14 3.5001-17.5 2.0001s-3.5-9-2-13 2.5-7.0001 5.5-9.5001c1.8-1.4999 7.5-0.5 8.5 2.5 1.333 4.0001-11 13.5-14 15.5-2.4 1.6-16.333 12-23 17-5 4.5-11.818 6.5-16.817 1.5-5.1827-5.183-1.3038-13.089 0-17 1.8334-5.5 5.8173-18.5 8.3173-28 1.8917-7.1883 4-39 27.5-53.5 23.5-14.5 154-8.0002 152.5-2e-4 -1.5 8-171.5 59.5-241.5 67',
        duration: 3,
      },
    ],
    links: [
      { label: 'Website', url: 'https://tomasmaillo.com/' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/tomas-maillo' },
    ],
  },
  stanFlint: {
    name: 'Stan',
    surname: 'Flint',
    imageUrl: 'https://avatars.githubusercontent.com/u/38284426?v=4',
    signature: [
      {
        path: 'M64.7685 3.05567C47.7691 -5.25256 16.1421 24.7641 18.5633 30.0245C27.2996 49.005 47.5134 38.8437 53.3929 45.8735C64.3995 59.0336 41.4422 93.8044 24.3789 93.8044C16.1348 93.8044 3.41723 87.9884 1.5 79.9363',
        duration: 5,
        reverse: true,
      },
      {
        path: 'M83.3036 32.4434C72.418 50.5505 50.749 87.9279 51.1581 92.5804C51.6693 98.396 55.0562 99.9297 56.2704 97.9486C57.2418 96.3637 96.3405 49.3789 95.7014 47.4616C91.4196 47.4616 54.8006 92.5804 61.8304 96.7344C70.3391 101.762 98.8628 58.9039 98.4494 53.7885C97.9382 47.4616 68.2212 98.8433 71.8639 100.058C75.5066 101.272 108.036 63.5024 110.72 58.8372C113.404 54.1719 87.1378 92.5804 87.6491 95.2645C88.1603 97.9486 115.321 61.2018 119.922 66.8256C123.603 71.3247 107.695 93.965 100.303 105.234',
        duration: 2,
        reverse: true,
      },
      {
        path: 'M106.309 106C121.945 78.8606 153.166 23.9427 152.961 21.3864C152.705 18.191 138.198 23.6232 140.244 25.6682C141.88 27.3042 186.044 9.90441 207.922 1M206.58 7.13513C186.662 38.1303 146.558 99.6221 145.484 97.6282C144.142 95.1358 187.982 56.2161 193.415 55.7688C198.847 55.3214 160.63 99.9289 162.675 99.6733C164.72 99.4176 200.7 75.2606 205.429 59.4115C209.213 46.7322 189.964 79.6063 179.866 97.6282C190.794 84.1224 214.532 55.2631 223.451 57.0469C229.203 58.1973 190.858 94.305 195.204 94.4968C212.033 75.3032 245.998 36.9288 247.225 36.98C254.446 37.2809 210.737 104.786 208.625 104.786C204.662 104.786 222.045 92.5795 222.748 91.6209',
        duration: 3,
        reverse: true,
      },
      {
        path: 'M125.991 62.4792C123.754 62.2875 120.558 60.8816 124.585 59.6673C128.611 58.4531 181.782 41.3258 186.83 43.9461M240.577 62.4792C234.889 61.3715 224.561 59.0281 228.754 58.5169C233.994 57.8778 261.219 62.4792 264.095 62.4792',
        duration: 1,
        reverse: true,
      },
      {
        path: 'M59.9751 64.7802C56.2258 64.4181 48.804 63.3487 49.1108 61.9683C49.4175 60.5879 77.23 59.2202 91.0978 58.709',
        duration: 1,
        reverse: true,
      },
    ],
    links: [
      { label: 'Website', url: 'https://stanflint.dev/' },
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
    links: [{ label: 'GitHub', url: 'https://github.com/Kyle-Winn' }],
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
        Ran the first Project Share Awards Night and also partnered with{' '}
        <a href="https://edinburghventurepoint.com/" target="_blank">
          Edinburgh Venture Point
        </a>{' '}
        to run our biggest session yet.
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
    subtitle: (
      <>
        Massive year of growth for the society. Partnered up with{' '}
        <a href="https://comp-soc.com/" target="_blank">
          CompSoc
        </a>{' '}
        for the first time. to run the Project Share Awards Night.
      </>
    ),
    members: [
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'President' },
      { ...TEAM_MEMBERS.tomasMaillo, position: 'Committee' },
      { ...TEAM_MEMBERS.kyleWinn, position: 'Committee' },
    ],
  },
  '2022': {
    year: '2022-2023',
    subtitle: <>The original team that laid the foundation of Project Share.</>,
    members: [
      { ...TEAM_MEMBERS.stanFlint, position: 'Committee' },
      { ...TEAM_MEMBERS.vojtechJanovec, position: 'Committee' },
      { ...TEAM_MEMBERS.tomasMaillo, position: 'Committee' },
      { ...TEAM_MEMBERS.kyleWinn, position: 'Committee' },
    ],
  },
}
