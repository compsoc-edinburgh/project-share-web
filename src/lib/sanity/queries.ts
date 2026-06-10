// GROQ queries — only published documents are visible to the public client,
// so pending submissions (drafts) never leak onto the site.

export const PROJECTS_QUERY = /* groq */ `
*[_type == "project"] | order(coalesce(submittedAt, "2000-01-01") desc, coalesce(legacyOrder, 0) desc) {
  _id,
  title,
  description,
  projectUrl,
  creators[]{ _key, name, contactUrl, avatarUrl },
  mediaUrl,
  "imageUrl": image.asset->url,
  iconUrl,
  submittedAt,
  legacyOrder
}`

export const NEXT_MEETUP_QUERY = /* groq */ `
*[_type == "meetup" && dateTime(date) >= dateTime(now())] | order(date asc)[0] {
  _id,
  title,
  date,
  location,
  description
}`

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_type == "siteSettings"][0] {
  discordInviteUrl,
  heroTagline,
  contactEmail,
  feedbackFormUrl
}`

export const COMMITTEE_QUERY = /* groq */ `
*[_type == "committeeYear"] | order(year desc) {
  _id,
  year,
  subtitle,
  "members": members[]{
    _key,
    position,
    ...(member->{ name, surname, avatarUrl, links[]{ _key, label, url } })
  }
}`
