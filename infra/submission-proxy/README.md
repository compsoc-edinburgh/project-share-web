# Public submission proxy

The site is static (GitHub Pages), so it cannot hold a Sanity **write** token —
anything shipped to the browser is public. Public "add your project" submissions
therefore go through a ~100-line proxy that:

1. validates + length-caps the payload (and drops honeypot hits),
2. creates a **draft** `project` document in Sanity using a write token stored
   as a server-side secret.

Drafts are invisible to the public API. Committee members review them in the
site's `/admin` studio under **Pending submissions**:

- **Approve** → Publish (the project appears on the site)
- **Reject** → Discard draft

## Deploy (Cloudflare Workers, free tier is plenty)

```sh
npm i -g wrangler
wrangler login
wrangler deploy infra/submission-proxy/cloudflare-worker.js --name project-share-submit
wrangler secret put SANITY_WRITE_TOKEN        # paste the write token (sanity.io/manage → API → Tokens)
# optional hardening:
# dashboard → worker → Settings → Variables:
#   SANITY_PROJECT_ID=bh3s0juq  SANITY_DATASET=production
#   ALLOWED_ORIGIN=https://projectshare.comp-soc.com
```

Then build the site with the endpoint:

```sh
VITE_SUBMIT_ENDPOINT=https://project-share-submit.<account>.workers.dev npm run build
```

(For GitHub Actions, add `VITE_SUBMIT_ENDPOINT` as a repo variable and pass it
in the build step env — see `.github/workflows/deploy.yml`.)

Until the endpoint is configured the /submit page automatically falls back to
pointing people at Discord, so nothing breaks without it.

## Rate limiting

Cloudflare's free tier lets you add a rate limiting rule on the worker route
(e.g. 5 requests/minute/IP) in the dashboard — recommended but not required;
the worst case without it is extra drafts in the review queue.
