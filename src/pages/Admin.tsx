import { Studio } from 'sanity'
import { studioConfig } from '../studio/sanity.config'

// Lazy-loaded route: the Studio bundle only ships to people who visit /admin.
const Admin = () => (
  <div style={{ height: '100dvh' }}>
    <Studio config={studioConfig} />
  </div>
)

export default Admin
