# DESIGN.md: the vawe docs design system

This file is the contract for how a docs page looks. Read it before you add a component, a colour or a page
shape. `WRITING.md` is the contract for the words. `content/docs/style-guide.mdx` (served at `/docs/style-guide`,
not in the sidebar) shows every component live; copy the MDX from there.

The docs sit one tab away from the site, so they take the site's design contract: vawe-hq/vawe
`site/DESIGN.md` and `site/app/globals.css`. Pure black ground, white ink, neutral greys, hairlines, Geist for
prose, IBM Plex Mono for anything literal, and one rare accent. Where this file and the site disagree, the site
wins for colour and type, and this file wins for reading length and components.

## Tokens

All tokens are in `app/global.css` as `--vd-*` custom properties. The fumadocs theme variables
(`--color-fd-*`) point at them, so fumadocs parts (sidebar, search, code blocks, cards) use the same colours.

| token | dark (the site) | light | job |
|---|---|---|---|
| `--vd-bg` | `#000000` | `#ffffff` | the ground |
| `--vd-surface` | `#0a0a0a` | `#fafafa` | a panel: callout, media frame, card |
| `--vd-surface-2` | `#111111` | `#f2f2f2` | a well inside a panel: a diagram box |
| `--vd-raised` | `#171717` | `#ebebeb` | a selected row, a hovered control |
| `--vd-line` | `#242424` | `#e3e3e3` | the hairline |
| `--vd-line-2` | `#3a3a3a` | `#c7c7c7` | a hairline that must be seen: diagram strokes, the rule callout |
| `--vd-ink` | `#ffffff` | `#000000` | headings, the rule callout icon |
| `--vd-ink-2` | `#ededed` | `#171717` | body text |
| `--vd-muted` | `#a1a1a1` | `#5c5c5c` | captions, descriptions, mono notes in diagrams |
| `--vd-dim` | `#8f8f8f` | `#6b6b6b` | code comments beside a command |
| `--vd-accent` | `#3291ff` | `#1a6fd6` | links, focus, the one thing to notice in a diagram |
| `--vd-accent-soft` | `rgba(50,145,255,.16)` | `rgba(26,111,214,.1)` | the fill of an accented diagram box |
| `--vd-warning` | `#f5b84a` | `#a35a00` | the warning callout only |

Rules:

- **The accent means "act on it, or look here".** Links, focus rings, and the one thing to notice in a diagram. Never a
  heading, a background band or decoration. One accent per diagram.
- **The light accent is darker.** `#3291ff` measures 3.2:1 on white, so light mode uses `#1a6fd6` (4.9:1).
- **The warning colour is for the warning callout only.** It is the only hue besides the accent.
- **Lane colours do not appear in the docs.** On the site a lane colour means a layer type; the docs have no timeline.
- **Dark is the default theme** (`app/layout.tsx`, `defaultTheme: 'dark'`), as on the site. Light stays for readers who
  choose it. Every component must work in both: use a token, never a hex value, in a component.

Radii: `--vd-r` 12px for a panel, `--vd-r-in` 4px inside it, 8px for a box in a diagram. Motion: `--vd-ease-out`
(Out Quint) and `--vd-dur-state` 200ms; only colour, opacity and the press scale animate.

## Type scale

Geist carries prose and headings; IBM Plex Mono carries code, paths, commands, numbers in diagrams and the small
uppercase labels. Both come from `next/font` in `app/layout.tsx`.

| role | size | line height | weight | tracking |
|---|---|---|---|---|
| page title (fumadocs `DocsTitle`) | 1.875rem | 1.2 | 600 | fumadocs default |
| h2 | 1.5rem | 1.2 | 600 | -0.03em |
| h3 | 1.125rem | 1.2 | 600 | -0.02em |
| body | 1rem (0.9375rem under 640px) | 1.6 | 400 | 0 |
| caption, callout text | 0.875rem to 0.9375rem | 1.45 to 1.55 | 400 | 0 |
| code block | 0.875rem Plex Mono | 1.7 | 400 | 0 |
| inline code | 0.875em Plex Mono | inherit | 400 | 0 |
| label (callout title, "From the blog") | 0.75rem Plex Mono, uppercase | 1 | 500 | 0.06em |
| diagram label / mono / number | 16 / 14 / 13 SVG units | | 600 / 400 / 400 | |

- **Measure: 68ch** for paragraphs and lists (`--vd-measure`). The site uses 46ch for landing columns that sit
  beside a proof; a docs page is long-form reading, so it takes the 60 to 75 characters that long text needs.
- **Body line height 1.6.** Light text on a black ground needs more lead; the site's own type scale says 1.55 for
  the same reason.
- `text-wrap: balance` on headings, `pretty` on paragraphs, list items and captions. Tables use tabular figures.
- No text under 12px on screen. A diagram label must stay at 12px or more at the narrowest width that shows it
  (see Diagram).

## Components

All are registered in `mdx-components.tsx`, so a page uses them without an import. Use each one only for its job.

### Video

A looping, muted clip with controls. It loads nothing until it scrolls into view (`preload="none"`), plays while at
least half of it is on screen, and pauses when it leaves. When the reader asks for reduced motion, it shows the
poster with a play button and waits for a tap.

Use it to show motion: a move, a render, a command at work. Do not use it for a still result; use a Figure.

```mdx
<Video
  src="time-and-seek/seek-to-frame.mp4"
  poster="time-and-seek/seek-to-frame.webp"
  caption="The playhead seeks to 1.2 s, then to 3.0 s, then back to 1.2 s. The third seek gives frame 72 again."
/>
```

Files: `public/media/<page-slug>/<name>.mp4` (H.264, at most 1.5 MB, 4 to 8 s, silent) and `<name>.webp` (the
poster, the same size as the clip). A short name like `time-and-seek/x.mp4` resolves to `/docs-static/media/...`
(`lib/media.ts`), because the site sends only `/docs/*` and `/docs-static/*` to this app. Props: `aspect`
(default `16 / 9`) and `label` (screen reader text, default the caption). How to make the files: `WRITING.md`,
"Make media".

### Figure

An image with a caption. Use it for a still result: a key frame, a sheet, a strip, a screenshot of a tool. Give
`width` and `height`, so the frame keeps its size before the image loads.

```mdx
<Figure src="time-and-seek/between-seeks.webp" alt="The page with the playhead between two seeks."
  caption="Between two seeks, the frame does not change." width={1280} height={720} />
```

Files: webp in `public/media/<page-slug>/`, at most 1600px wide, at most 300 KB. `alt` says what the image shows;
`caption` says what the reader must notice.

### Diagram

An inline SVG drawing in the docs colours: hairline boxes, a mono note under a sans label, and the accent on the
one thing to notice. Use it to explain a structure or a flow that text alone makes hard: a pipeline, a loop, the
parts of a page. Do not draw what a table or a list says as well.

Two diagrams are ready:

```mdx
<PageToFilm caption="The renderer does this for every t from 0 to the duration, then mixes the audio." />
<TheLoop caption="Do the stages in order. Each verb prints a next: line that names the next stage." />
```

A new diagram uses `<Diagram>` and three primitives, so it works in both themes with no colour of its own:

```mdx
<Diagram label="A draft goes to the critique." caption="..." narrow={<svg viewBox="0 0 361 171">...</svg>}>
  <svg viewBox="0 0 681 81">
    <DiagramBox x={0} y={0} w={200} h={80} />
    <DiagramText x={16} y={30}>Draft</DiagramText>
    <DiagramText x={16} y={56} kind="mono">vawe dev</DiagramText>
    <DiagramArrow points={[[201, 40], [279, 40]]} />
    <DiagramBox x={280} y={0} w={200} h={80} accent />
  </svg>
</Diagram>
```

The convention:

- **Draw the wide version 680 units across**, with `viewBox="0 0 681 H"` (one extra unit keeps the right
  hairline). Labels are `DiagramText` (16, sans, 600), notes `kind="mono"` (14), counters `kind="num"` (13).
- **Draw a narrow version 360 units across** in `narrow` when the wide one has text. Under a 640px column the
  narrow one shows; without it, a 680-unit drawing on a phone renders its labels near 7px.
- **One accent** (`accent` on a box, an arrow or a text): the thing the caption tells the reader to notice.
- **`label` is required:** the drawing as one or two plain sentences for a screen reader.
- Arrows: `DiagramArrow points={[[x1, y1], ..., [xn, yn]]}`, a polyline with a head on the last segment.
- No hex value, no `fill` or `stroke` attribute, no font size in a diagram. If a drawing needs a style that the
  classes in `components/docs.css` do not have, add a class there for every diagram, not an attribute for one.

### Steps

The fumadocs steps, reused. Use them on a how-to page for an ordered task, one command or action per step, with
an h3 title in each step.

````mdx
<Steps>
<Step>

### Write the brief

```bash
bin/vawe new hello --request "a 5 s sting for a coffee brand"
```

</Step>
</Steps>
````

### Callout

A short boxed note. Three kinds, each with one job:

| kind | icon | use it for |
|---|---|---|
| `note` | Info | a fact the reader can miss without harm, such as a side effect or a default |
| `warning` | TriangleAlert | an action that loses work, hides an error or breaks a render |
| `rule` | Scale | a house rule from `AGENTS.md` or a skill, that a page must obey |

```mdx
<Callout kind="rule">Time is the seek, never the clock. Every frame must come from `t` alone.</Callout>
```

At most two callouts on a screen. A callout that holds a paragraph of explanation belongs in the text. The old
fumadocs `type="info|warn|error"` still works and maps to `note` or `warning`.

### Term

An inline word that links to its glossary entry and shows the entry's first sentence on hover or focus.

```mdx
The renderer <Term id="seek">seeks</Term> the page to a time.
```

Use it on the first use of a glossary word on a page, not on every use. The `id` is the `[#id]` of a
`### Word [#id]` heading in `content/docs/glossary.mdx`; a missing id fails the build (`lib/glossary.ts`). The hover
text is the first sentence of the entry, so that sentence must stand alone.

### Cards

The fumadocs cards, with a lucide icon. Use them for "what to read next" at the end of a concept page and on
section index pages; at most four in a row of two.

```mdx
import { Rocket } from 'lucide-react';

<Cards>
  <Card icon={<Rocket />} title="Quickstart" href="/docs/quickstart">Render a film in ten minutes.</Card>
</Cards>
```

### From the blog

Not a component in the MDX: the `blog:` list in the front matter. `app/docs/[[...slug]]/page.tsx` renders it as
one line at the end of the page.

```yaml
blog:
  - slug: page-clock
    title: Seed Math.random and freeze Date.now in JavaScript
```

## Icons

Lucide icons (fumadocs ships `lucide-react`). One icon per sidebar section, set on the separator in `meta.json` as
`"---[Icon]Name---"`, and one per page in the `icon:` front matter. A page icon is optional; a section icon is not.

| section (PLAN.md) | icon |
|---|---|
| 1. Start | `Rocket` |
| 2. Make a film, step by step | `Clapperboard` |
| 3. The page | `FileCode` |
| 4. Building blocks | `Blocks` |
| 5. Guides by film type | `Compass` |
| 6. Reference | `BookMarked` |
| 7. Help | `LifeBuoy` |

The glossary page uses `BookA`, the style guide `Shapes`. Icons are outline, the size fumadocs sets, in the text
colour; never the accent.

## Layout

fumadocs owns the layout: the sidebar, the page column and the table of contents. Do not override it. One page
setting exists: `tocDepth` in the front matter (2 to 4, default 3) limits the table of contents, for a long page
like the glossary.

## Provenance

| surface | source | took | rejected |
|---|---|---|---|
| tokens and type | vawe-hq/vawe `site/DESIGN.md`, `site/app/globals.css` (2026-10-30) | the black ground, greys, hairlines, the accent and its light-mode value, Geist and Plex Mono, weights 400 and 600, tracking by size, the uppercase mono label | the 46ch measure (a landing column, not long-form reading); black only (the docs keep a light theme for readers who choose it) |
| prose type | ui-skills `jakubkrehel/better-typography` | a 60 to 75 character measure, body line height 1.5 to 1.6, unitless line heights, rem sizes, `text-wrap` balance and pretty, dotted underline for a defined term (Term), tabular figures in tables | its default type scale and its advice to load new faces: the site's faces and sizes win |
| diagrams and frames | ui-skills `mengto/container-lines` | hairlines as structure, not decoration; one line weight across a system; quiet strokes on dark and light | the page-edge guide lines and corner squares: fumadocs owns the page frame, and the marks would compete with the one accent |
| example clip | `media-src/seek-to-frame/page.html`, rendered with vawe `dev --silent` | | |
