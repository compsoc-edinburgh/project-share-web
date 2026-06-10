import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PixelFolder from '../components/PixelFolder'

const NotFound = () => (
  <PageShell>
    <section className="notfound" data-keynav-section>
      <PixelFolder width={96} />
      <h1 className="pixel">404</h1>
      <p>
        Nothing in this folder. Maybe it was a project that never shipped —
        happens to the best of us.
      </p>
      <p>
        <Link to="/">← 01 Project Share</Link>
      </p>
    </section>
  </PageShell>
)

export default NotFound
