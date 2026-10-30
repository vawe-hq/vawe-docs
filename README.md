# vawe-docs

The documentation app for vawe: fumadocs 16, fumadocs-mdx 15 and Next 16. It is served at
https://vawe.dev/docs. The site in vawe-hq/vawe (a separate Next 15 app) proxies `/docs/*` and
`/docs-static/*` to this app, which runs in its own container.

Run it locally: `npm ci && npm run dev`, then open http://localhost:3000/docs.

Content is in `content/docs/*.mdx`. The page order is `content/docs/meta.json`.

`vendor/vawe/` holds copies of vawe code that the pages import (motion helpers, the typography
function, the Accept-header parser). The vawe-hq/vawe repo pushes them. Do not edit them here.

Keep fumadocs, fumadocs-mdx and Next on matching major versions.

The Docker image listens on port 3000: `docker build -t vawe-docs . && docker run -p 3000:3000 vawe-docs`.
