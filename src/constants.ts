export const ACCENT_COLOR = '#7816f4'

export const SKETCH_COLOR = ACCENT_COLOR + '33' // slightly more transparent

export const SECONDARY_COLOR = '#000000'

export const NEXT_MEETUP:
  | {
      title: string
      date: Date
      location: string
      description: string
    }
  | undefined = {
  title: 'Project Share!',
  date: new Date('2023-09-20T15:00:00'),
  location: 'AT 2.05',
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
        avatarURL: 'https://unavatar.io/github/fast-fingers',
        contactURL: 'https://www.linkedin.com/in/kyle-winn-201783260/',
      },
    ],
    description:
      'Embark on a thrilling pirate adventure with our online pirate game. Battle other pirates, collect gold, and rule the seas.',
    projectURL: 'https://landho.uk',
    media: './media/projects/landho.mp4',
    icon: './media/projects/landho.png',
  },
].reverse()
