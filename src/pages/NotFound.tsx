import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

const NotFound = () => (
  <PageShell>
    <section className="page-section">
      <h1 className="page-title">404</h1>
      <p>
        Nothing here. Maybe it was a project that never shipped — happens to
        the best of us.
      </p>
      <p>
        <Link to="/">Back to the index</Link>
      </p>
    </section>
  </PageShell>
)

export default NotFound
