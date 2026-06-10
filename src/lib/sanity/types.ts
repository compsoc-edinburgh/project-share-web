export interface Creator {
  _key: string
  name: string
  contactUrl?: string
  avatarUrl?: string
}

export interface Project {
  _id: string
  title: string
  description: string
  projectUrl?: string
  creators: Creator[]
  /** Path (e.g. /media/projects/x.mp4) or absolute URL to a video/image demo */
  mediaUrl?: string
  /** Resolved Sanity image asset URL, when uploaded via Studio */
  imageUrl?: string
  iconUrl?: string
  submittedAt?: string
  legacyOrder?: number
}

export interface Meetup {
  _id: string
  title: string
  date: string
  location: string
  description?: string
}

export interface MemberLink {
  _key: string
  label: string
  url: string
}

export interface TeamMember {
  name: string
  surname?: string
  avatarUrl?: string
  bio?: string
  links?: MemberLink[]
}

export interface CommitteeMember extends TeamMember {
  _key: string
  position: string
}

export interface CommitteeYear {
  _id: string
  year: string
  subtitle?: string
  members: CommitteeMember[]
}

export interface SiteSettings {
  discordInviteUrl?: string
  heroTagline?: string
  contactEmail?: string
  feedbackFormUrl?: string
}
