export type SignatureStroke = {
  path: string
  duration?: number // defaults to 3
  reverse?: boolean
}

export type TeamMember = {
  name: string
  surname: string
  position: string
  imageUrl: string
  links?: { label: string; url: string }[]
  signature: SignatureStroke[] | string 
}

export type CommitteeData = {
  year: string
  subtitle: React.ReactNode
  members: TeamMember[]
}

export type CommitteeYear = '2025' | '2024' | '2023' | '2022'
