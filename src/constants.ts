export const ACCENT_COLOR = '#7816f4'

export const SKETCH_COLOR = ACCENT_COLOR + '33' // slightly more transparent

export const SECONDARY_COLOR = '#000000'

export interface MeetupDetails {
  title: string
  date: Date
  location: string
  description: string
}

export const NEXT_MEETUP: MeetupDetails | undefined = {
  title: 'Project Share!',
  date: new Date('2024-11-07T17:00:00'),
  location: 'AT_2.07',
  description: 'Bring your laptop!',
}

export const DISCORD_INVITE_LINK = 'https://discord.gg/wNGukFdBgp'

export interface Creator {
  name: string
  avatarURL?: string
  contactURL?: string
}

export interface Project {
  id: number
  title: string
  creators: Creator[]
  description: string
  projectURL?: string
  media: string
  icon?: string
}

export const PROJECTS_SHOWN_ON_HOMEPAGE = 2

// The last three are shown on homepage. They are shown in inverse order array
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    creators: [
      {
        name: 'Tomas Maillo',
        avatarURL: 'https://unavatar.io/github/tomasmaillo',
        contactURL: 'https://github.com/tomasmaillo',
      },
    ],
    description:
      'My own digital canvas showing all of my creations. Each year, like a tech tree, it branches out further, showcasing new creations that echo my evolution. Curious? Step inside the annual update carousel!',
    projectURL: 'https://tomasmaillo.com',
    media: './media/projects/tomasmaillo.mp4',
    icon: './media/projects/tomasmaillo.ico',
  },
  {
    id: 2,
    title: 'Main Library',
    creators: [
      {
        name: 'Tomas Maillo',
        avatarURL: 'https://unavatar.io/github/tomasmaillo',
        contactURL: 'https://github.com/tomasmaillo',
      },
    ],
    description:
      "Check the busyness of UoEdinburgh's Main Library from the comfort of your screen. Brought to life with vivid colors and dynamic graphs, it's your peephole into the intellectual orchestra, of exam season",
    projectURL: 'https://library.tomasmaillo.com',
    media: './media/projects/library.mp4',
    icon: './media/projects/library.ico',
  },
  {
    id: 3,
    title: 'Hexbois.com',
    creators: [
      {
        name: 'Stan Flint',
        avatarURL: 'https://unavatar.io/github/StanFlint',
        contactURL: 'https://github.com/StanFlint',
      },
    ],
    description:
      'Welcome to Hexbois, where hexagons meet mayhem! Build your empire, destroy your enemies, and rule the hexagonal realm. Will you be the last hex standing?',
    projectURL: 'https://hexbois.com',
    media: './media/projects/hexbois.mp4',
    icon: './media/projects/hexbois.png',
  },
  {
    id: 4,
    title: 'vibe-check',
    creators: [
      {
        name: 'Stan Flint',
        avatarURL: 'https://unavatar.io/github/StanFlint',
        contactURL: 'https://github.com/StanFlint',
      },
      {
        name: 'Tomas Maillo',
        avatarURL: 'https://unavatar.io/github/tomasmaillo',
        contactURL: 'https://github.com/tomasmaillo',
      },
    ],
    description:
      'Transforming your audience into participants. Liven up presentations by channeling audience feedback into real-time, interactive engagement. ',
    projectURL: 'https://vibe-check.tech',
    media: './media/projects/vibe-check.mp4',
    icon: './media/projects/vibe-check.png',
  },
  {
    id: 5,
    title: 'Land Ho!',
    creators: [
      {
        name: 'Kyle Winn',
        avatarURL: 'https://unavatar.io/github/Kyle-Winn',
        contactURL: 'https://www.linkedin.com/in/kyle-winn-201783260/',
      },
    ],
    description:
      'Embark on a thrilling pirate adventure with our online pirate game. Battle other pirates, collect gold, and rule the seas.',
    projectURL: 'https://landho.uk',
    media: './media/projects/landho.mp4',
    icon: './media/projects/landho.png',
  },
  {
    id: 6,
    title: 'AI Gomoku',
    creators: [
      {
        name: 'Cosmo',
        avatarURL: 'https://unavatar.io/github/cosmobobak',
        contactURL: 'https://cosmo.tardis.ac/',
      },
    ],
    description:
      "Gomoku is a strategy board game that's easy to learn but hard to master. Watch an AI agent self play hundreds of games!",
    media: './media/projects/ai-gomoku.mp4',
  },
  {
    id: 7,
    title: 'Portfolio Website',
    creators: [
      {
        name: 'Roberta Pošiūnaitė',
        avatarURL: 'https://unavatar.io/github/dprRoberta',
        contactURL: 'https://robertaposiunaite.com/',
      },
    ],
    description:
      "Hey there! Welcome to my little corner of the digital world. I'm a Lithuanian currently pursuing a Computer Science degree at the University of Edinburgh. I'm dedicated to honing my skills, solving challenges, and crafting digital solutions that make a difference. Join me in this coding adventure and have a look around!",
    projectURL: 'https://robertaposiunaite.com/',
    media: './media/projects/roberta-posiunaite.mp4',
    icon: './media/projects/roberta-posiunaite.png',
  },
  {
    id: 8,
    title: 'Wee Wonders',
    creators: [
      {
        name: 'nkdem',
        avatarURL: 'https://unavatar.io/github/nkdem',
        contactURL: 'https://github.com/nkdem',
      },
      {
        name: 'Danny Pinkney',
        avatarURL: 'https://unavatar.io/github/danny88o',
        contactURL: 'https://github.com/danny88o',
      },
      {
        name: 'Khalid',
        avatarURL: 'https://unavatar.io/github/khalidbelhadj',
        contactURL: 'https://github.com/khalidbelhadj',
      },
    ],
    description:
      "Wee Wonders is an interactive children's story book application which uses eye tracking for controls. Look to the left and right to flip the pages of the book and read a story.",
    media: './media/projects/eye-tracking-page-flip.mp4',
  },
  {
    id: 9,
    title: 'Flatmouse',
    creators: [
      {
        name: 'Caterina Mammola',
        avatarURL: 'https://unavatar.io/github/Cat2005',
        contactURL: 'https://www.linkedin.com/in/caterina-m/',
      },
    ],
    description:
      'FlatMouse was created to empower students to share their flat experiences so that future tenants may be alerted to potential issues.',
    projectURL: 'https://www.flatmouse.co.uk/',
    media: './media/projects/flatmouse.mp4',
    icon: './media/projects/flatmouse.png',
  },
  {
    id: 10,
    title: "3li's Portfolio",
    creators: [
      {
        name: 'Ali Abdelaal',
        avatarURL: 'https://unavatar.io/github/ali205412',
        contactURL: 'https://github.com/ali205412/'
      },
    ],
    description: "As a die hard Linux fan, I'm no mere website designer - I'm a developer to my terminal-tweaking core. So I took the logical path - I built a terminal site <3",
    projectURL: 'https://aliabdelaal.com/',
    media: './media/projects/3lisPortfolio.mp4',
    icon: './media/projects/3lisPortfolio.png',
  }
].reverse()
