export const ACCENT_COLOR = '#7816f4'

export const SKETCH_COLOR = ACCENT_COLOR + '33' // slightly more transparent

export const SECONDARY_COLOR = '#000000'

export const NEXT_MEETUP: {
  title: string
  date: Date
  location: string
  description: string
} = {
  title: 'Project Share!',
  date: new Date('2023-09-20T18:30:00'),
  location: 'AT 2.04',
  description: 'Bring your laptop!',
}

export const DISCORD_INVITE_LINK = 'https://discord.gg/wNGukFdBgp'

export interface Project {
  id: number
  title: string
  creator: string[]
  description: string
  link: string
  media: string
  icon: string | undefined
  hideAvatar?: boolean
}

export const PROJECTS_SHOWN_ON_HOMEPAGE = 2

// The last three are shown on homepage. They are shown in inverse order array
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    creator: ['Tomas Maillo'],
    description:
      'My own digital canvas showing all of my creations. Each year, like a tech tree, it branches out further, showcasing new creations that echo my evolution. Curious? Step inside the annual update carousel!',
    link: 'https://tomasmaillo.com',
    media: './media/projects/tomasmaillo.mp4',
    icon: './media/projects/tomasmaillo.ico',
  },
  {
    id: 2,
    title: 'Main Library',
    creator: ['Tomas Maillo'],
    description:
      "Check the busyness of UoEdinburgh's Main Library from the comfort of your screen. Brought to life with vivid colors and dynamic graphs, it's your peephole into the intellectual orchestra, of exam season",
    link: 'https://library.tomasmaillo.com',
    media: './media/projects/library.mp4',
    icon: './media/projects/library.ico',
  },
  {
    id: 3,
    title: 'Hexbois.com',
    creator: ['Stan Flint'],
    description:
      'Welcome to Hexbois, where hexagons meet mayhem! Build your empire, destroy your enemies, and rule the hexagonal realm. Will you be the last hex standing?',
    link: 'https://hexbois.com',
    media: './media/projects/hexbois.mp4',
    icon: './media/projects/hexbois.png',
  },
  {
    id: 4,
    title: 'vibe-check',
    creator: ['Stan Flint', 'Tomas Maillo'],
    description:
      'Transforming your audience into participants. Liven up presentations by channeling audience feedback into real-time, interactive engagement. ',
    link: 'https://vibe-check.tech',
    media: './media/projects/vibe-check.mp4',
    icon: './media/projects/vibe-check.png',
  },
].reverse()
