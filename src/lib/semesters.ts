import type { Project } from './sanity/types'

export interface SemesterGroup {
  label: string
  projects: Project[]
}

/**
 * Edinburgh academic calendar: Semester 1 ≈ Sep–Dec, Semester 2 ≈ Jan–May,
 * summer rolls into Semester 2's year label. Projects without a submission
 * date (the pre-CMS import) land in ARCHIVE, ordered as on the old site.
 */
function semesterLabel(iso: string): string {
  const d = new Date(iso)
  const month = d.getMonth() // 0-based
  const year = d.getFullYear()
  if (month >= 8) {
    return `${year}/${String((year + 1) % 100).padStart(2, '0')} SEMESTER 1`
  }
  return `${year - 1}/${String(year % 100).padStart(2, '0')} SEMESTER 2`
}

export function groupBySemester(projects: Project[]): SemesterGroup[] {
  const groups = new Map<string, Project[]>()
  for (const p of projects) {
    const label = p.submittedAt ? semesterLabel(p.submittedAt) : 'ARCHIVE'
    const list = groups.get(label) ?? []
    list.push(p)
    groups.set(label, list)
  }
  // Dated groups first (the query pre-sorts newest-first), ARCHIVE last.
  const entries = [...groups.entries()]
  entries.sort((a, b) => {
    if (a[0] === 'ARCHIVE') return 1
    if (b[0] === 'ARCHIVE') return -1
    return 0
  })
  return entries.map(([label, list]) => ({ label, projects: list }))
}
