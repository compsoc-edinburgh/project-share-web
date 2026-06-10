# Project Share

The website of [Project Share](https://projectshare.comp-soc.com/) — a CompSoc
(University of Edinburgh) Special Interest Group where students share the
journey of building tech projects.

Keyboard-first, pixel-flavoured redesign: navigate with `1–5`, arrows to move
between pages/sections, `WASD` to scroll, `M` for dark mode, `C` for high
contrast, `+`/`-` to zoom, `H` to hide the key bar.

## Stack

- **React 19 + Vite + TypeScript**, GSAP for motion (custom eases, scroll
  reveals), deployed to GitHub Pages via Actions.
- **Sanity CMS** (project `bh3s0juq`, dataset `production`) holds projects,
  meetups, team members, committee years and site settings. The public site
  reads it anonymously via CDN — published documents only.
- **Admin portal** at `/admin`: an embedded Sanity Studio (lazy-loaded).
  Committee members = members of the Sanity project
  ([invite them here](https://www.sanity.io/manage/project/bh3s0juq)).
- Fonts: [Departure Mono](https://departuremono.com) (pixel display),
  [Commit Mono](https://commitmono.com) (UI), Syne Mono (accents) — all OFL.

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## How content works

| Want to…                       | Do this                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| Set the next meetup date       | `/admin` → **Meetups** → create/edit a meetup (future date)    |
| Approve a public submission    | `/admin` → **Pending submissions** → review → **Publish**      |
| Reject a submission            | `/admin` → open it → **Discard draft**                         |
| Edit team / committee years    | `/admin` → **Team members** / **Committee years**              |
| Change Discord link / tagline  | `/admin` → **Site settings**                                   |

The home-page ticket, showcase, and team pages all render live from the CMS.

## Public submissions ("add your project")

The `/submit` form posts to a tiny proxy that creates a **draft** project in
Sanity — drafts are invisible to the public API until a committee member
publishes them. Deploy the proxy once (free Cloudflare Worker) and set
`VITE_SUBMIT_ENDPOINT`; until then the form gracefully points people to
Discord/GitHub. Full instructions: [infra/submission-proxy](infra/submission-proxy/README.md).

Old-school pull requests still work for media files: drop assets in
`public/media/projects/` and reference them as `/media/projects/<file>` in the
project's **Media URL** field.

## Contact

Questions? Join the [Discord](https://discord.gg/wNGukFdBgp).

## License

MIT — see [LICENSE](LICENSE). Departure Mono ships under the SIL OFL
(`public/fonts/DepartureMono-LICENSE.txt`).
