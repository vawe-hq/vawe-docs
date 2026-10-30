// Only /docs/* and /docs-static/* reach this app through the site (vawe-hq/vawe site/next.config.mjs), so public/media/
// is served at /docs-static/media/ (next.config.mjs rewrites it back).
export function mediaUrl(src: string): string {
  return /^(https?:)?\//.test(src) ? src : `/docs-static/media/${src}`;
}
