# WRITING.md: how to write a vawe docs page

Every docs page follows this file. `DESIGN.md` says how a page looks; this file says what it says and how. The
glossary (`content/docs/glossary.mdx`) is the first page written with it: read it as the example.

The reader is a person or an agent who wants to make a film and has not read the vawe source. A good page lets
them do one thing or understand one idea without another tab open.

## 1. Simplified Technical English

Write in ASD-STE100 Simplified Technical English. The rules:

1. **Short sentences.** At most 20 words in an instruction, at most 25 words in a description.
2. **One instruction per sentence.** Start an instruction with the verb: "Run `bin/vawe dev`.", not "You should
   run `bin/vawe dev`."
3. **Active voice.** Name who does the action: "The renderer seeks the page.", not "The page is seeked."
4. **Present tense.** "The draft has sound.", not "The draft will have sound."
5. **One word, one meaning.** Use the words in the vocabulary table (section 2). Never use a synonym for variety.
6. **Use articles.** "Open the page.", not "Open page."
7. **At most three nouns together.** "the render key", not "the page render cache key hash".
8. **No idioms, metaphors or slang.** "The check stops the render.", not "The check pulls the plug."
9. **At most six sentences in a paragraph.**
10. **A verb, not a gerund, where a verb works.** "To render a draft, run...", not "Rendering a draft is done by...".

Technical words, code, file names and flags are exempt from the word rules. Put every one of them in backticks:
`page.html`, `--aspect`, `data-world`, `window.seek(t)`.

Two house rules on top of STE:

- **No em dash (U+2014), anywhere.** Use a colon, a comma, a full stop or parentheses. An en dash only in a number
  range (3 to 5 also works).
- **Explain the idea fully.** STE makes sentences short; it does not make pages short. When a nuance does not fit
  in one short sentence, write two short sentences. Every concept page answers what, why and how.

Before:

> Rendering is done deterministically, since the clock is virtualised, so you'll always get identical output no
> matter how many times you kick off a render.

After:

> The renderer gives the same frames on every render. A virtual clock controls `Date`, timers and `Math.random`,
> so code that reads the time still sees the seek time.

## 2. Controlled vocabulary

Use the word in the first column. Never use a word in the last column for that concept. The glossary defines each
word; link the first use on a page with `<Term id="...">`.

| concept | use | never use |
|---|---|---|
| the HTML file that describes a film | page | composition, scene file, project, template |
| the mp4 that the renderer writes | film | video file, export, movie, output video |
| a short silent mp4 in the docs or a move demo | clip | film (a clip is not made with `ship`) |
| one element per beat, `data-world` | world | scene, slide, section |
| one part of the story with one idea | beat | scene, moment |
| set the page to time `t` and paint the frame | seek | play, jump to, scrub (scrub only for the studio's scrubber) |
| the fast half-size render, `vawe dev` | draft | preview, test render |
| the full-quality render | final | export, production render, master |
| make the final, `vawe ship` | ship | publish, export, deploy |
| the owner's sign-off, `vawe approve` | approve | accept, OK, sign off |
| the person who asked for the film and signs off | owner | user, client, customer |
| the person who reads the docs | you | the user, one, developers |
| a model that writes and runs commands | agent | AI, bot, LLM, assistant |
| review by a session that did not write the page | critique | feedback, review (alone) |
| scored review against a rubric | judge | grade, rate, eval |
| an automatic measurement with a fix line | check | lint, validator, test |
| a check that you run by name with `vawe check` | gate | test, script |
| stop a verb with an error | refuse | block, reject (reject is a critique verdict), fail (for advice) |
| report a problem and go on | advise | warn (only for a printed warning), complain |
| a declared rule break with a reason | waiver | exception, override, ignore, suppress |
| one command of `bin/vawe` | verb | subcommand, script, tool, command (alone) |
| a `SKILL.md` that an agent loads | skill | prompt, plugin (a plugin is how a skill installs) |
| a file in `prompts/` for one film type | template | preset, starter (the starter is the page `new` writes) |
| a named copyable piece of motion | move | effect, animation, video component (the site's name; say it once) |
| a chain of moves for one short film | recipe | sequence, combo, preset |
| the camera in `core/surfaces/lens.js` | lens | filter, shader (alone) |
| a named set of lens settings | look | filter, preset, style |
| the background layer of a world | ground | background (in prose), backdrop |
| one sound at one second | cue | sound effect (alone), sfx |
| a built-in synth sound | voice | instrument, synth (alone), patch |
| a music track under the whole film | bed | soundtrack, background music |
| lower the music under a voice | duck | sidechain, lower |
| the width-to-height ratio | aspect | format, size, resolution, orientation |
| the code that owns time during a render | virtual clock | fake timers, mock clock |
| the same page gives the same frames | determinism, deterministic | reproducible (alone), stable |
| the change from one world to the next | cut | transition (for the change itself) |
| what carries the eye across a cut | handoff | transition effect |
| the product | vawe (lowercase, as in vawe `AGENTS.md` and `README.md`, also at the start of a sentence) | VAWE, the tool, the framework (alone) |

A new concept gets a glossary entry and a row here in the same commit.

## 3. Page shapes

Each page is one of three shapes. Pick the shape before you write. A page that tries to be two shapes splits in two.

### Concept page

For an idea the reader must understand: the page, worlds, time and seek, determinism, the lens.

1. **What it is.** One or two sentences in the first paragraph. The reader who stops here knows the idea.
2. **Why it exists.** The problem it solves, with a number or an observed failure where one exists.
3. **How it works.** A `<Diagram>` and the steps of the mechanism, in order. Name the file that owns it.
4. **An example.** The smallest real code or command, and a `<Video>` or `<Figure>` of the result.
5. **Limits.** What it does not do, and the error the reader sees when they hit the limit.
6. **What to read next.** `<Cards>` with two to four pages.

### How-to page

For a task with a result: write the brief, render a draft, ship, match a reference, a guide by film type.

1. **Goal.** One sentence: what the reader has at the end. Then the prerequisites as a short list.
2. **Steps.** `<Steps>`, one action per step, each with its exact command in a `bash` block.
3. **What you see.** After the steps that print or write something: the output line, the file path, and a
   `<Figure>` or `<Video>` of the result. Real output only, trimmed with `...`, never invented.
4. **Troubleshooting.** A table: what you see, why, what to do. Take the rows from real failures (the verb's
   error text, `out/<film>.runs.jsonl`, the troubleshooting page).
5. **What to read next.**

### Reference page

For lookup: the CLI, render flags, checks, the page API, templates, fonts and sounds, files and outputs.

1. One sentence that says what the page lists and where the list comes from (for example `bin/vawe --help --all`).
2. Tables. One row per item, columns in a fixed order: name, what it does, default, example. Sort by the order the
   source uses, or alphabetically when the source has no order.
3. No narrative. A row that needs explanation links to its concept page.

### Every page

- Front matter: `title` (2 to 5 words), `description` (one sentence of at most 25 words, with a full stop),
  `icon` (optional, lucide), `blog` (see section 6).
- The first use of each glossary word is a `<Term>`.
- At least one picture on a concept or how-to page: a `<Diagram>`, a `<Video>` or a `<Figure>`.
- h2 for sections, h3 inside them. No h4. No heading without text under it.

## 4. Name the source of every fact

Every fact on a page comes from a file you opened or a command you ran in this session, at a known vawe commit.
Never copy a fact from another docs page, an inventory, a blog post or memory without opening the source.

- **In the text,** name the source where it helps the reader act: the file that owns the behaviour
  (`core/engine/page-clock.js`), or the command that prints the list (`bin/vawe sound`). Write it in backticks.
  Do not write "the code says" or "according to".
- **At the end of the page,** list every source in an MDX comment, one line per fact or table, so a reviewer can
  check it without a search:

  ```mdx
  {/* sources (vawe 0933875ba):
    duration auto: AGENTS.md "Hard rules"
    dev flags: bin/vawe dev --help
    virtual clock: core/engine/page-clock.js:5-8
  */}
  ```

- **Counts** (verbs, moves, recipes, gates) come from a command or a file listing that you ran, with the number
  in the comment. A count changes often, so use one only where the reader needs it.
- A fact you could not check does not go on the page. Tell the lead in your report.

## 5. Make media with vawe

Every clip and still on a docs page is rendered with vawe itself. Run the verbs from a vawe checkout. Read
`bin/vawe <verb> --help` before the first use of a verb.

### A still of a page

```bash
bin/vawe still films/examples/colour-sting/page.html --at 2.4 --out /tmp/still.png
bin/vawe still films/x/page.html --at 0 --aspect 1200:630 --size 1200x630   # a size must match the aspect
```

### A clip

1. Find a film that shows the point (`films/examples/`, a move demo in `prompts/moves/demo/`). If none shows it,
   write a small page in this repo under `media-src/<name>/page.html`, with its fonts in `media-src/<name>/assets/`.
   Follow the page contract (`AGENTS.md`): a `duration` meta, `data-world`, time from the seek only.
2. Render a silent draft straight into the docs repo:

   ```bash
   bin/vawe dev <path>/media-src/<name>/page.html --silent --no-judge --out <docs>/public/media/<page-slug>/<name>.mp4
   ```

   A draft is 960x540 at 30 fps, H.264. `dev` also writes a key-frame sheet PNG next to the mp4: delete it.
3. Make the poster from a still at the moment that tells the story, then convert it to webp. No vawe verb writes
   webp, so this step uses ffmpeg:

   ```bash
   bin/vawe still <page> --at 4.6 --out /tmp/poster.png
   ffmpeg -i /tmp/poster.png -vf scale=960:540 -c:v libwebp -quality 82 <docs>/public/media/<page-slug>/<name>.webp
   ```

4. Check: the mp4 is under 1.5 MB, 4 to 8 s, silent, and loops without a jump. Look at the poster at full size.

Rules for a clip page:

- **Type at least 36px at 1080p.** A clip shows at about 700px wide in the docs, so 36px renders near 13px. The
  `readable-text-size` advice from `dev` is real for docs clips.
- **On brand:** the site palette (`#000` ground, `#0a0a0a` panels, `#242424` hairlines, `#3291ff` accent once),
  Geist and IBM Plex Mono from vawe `assets/fonts/`.
- **One idea per clip,** and the caption names it.
- Other advice from `dev` (read holds, overshoot share, spectacle) is for films; follow it where it helps the clip.

### A still of the docs or the site

```bash
bin/vawe shot http://localhost:3000/docs/quickstart --w 1440,390 --full --out /tmp/shots
```

`shot` cannot switch the theme or hover an element. Say so in your report if you need that.

### A strip or sheet as a figure

`bin/vawe strip <page> --cuts` and `bin/vawe sheet <page|mp4>` write PNGs that make good figures for a motion pass
or a critique page. Convert them to webp at most 1600px wide.

## 6. The "From the blog" line

Each docs page lists the blog posts that explain its why, in the front matter. The page renders them as one line
at the end.

```yaml
blog:
  - slug: page-clock
    title: Seed Math.random and freeze Date.now in JavaScript
```

- Use the post's exact title from `site/content/blog/<slug>.md` in vawe-hq/vawe.
- One to three posts. Pick the posts whose topic is this page, not every post that mentions it.
- The blog post links back to the page with its own `docs:` front matter (PLAN.md, phase 4).

## 7. Review checklist

The reviewer runs each row and writes the evidence. A row without evidence is "not checked".

| check | how |
|---|---|
| The page has one shape and follows it | name the shape, compare the sections |
| Every fact has a source in the sources comment | open three sources at random and compare |
| Every command runs as written | run it, or show its `--help` line |
| Sentences: at most 20 words per instruction, 25 per description | count the five longest |
| Active voice, present tense, articles | read the first two paragraphs aloud |
| Words match the vocabulary table | search the page for each "never use" word |
| First use of each glossary word is a `<Term>` | list the terms; the build fails on a bad id |
| A diagram, video or figure on a concept or how-to page | name it |
| Media under the size limits, made with vawe | `ls -la public/media/<slug>/` |
| No em dash | `grep -n "$(printf '\342\200\224')" content/docs/<page>.mdx` finds nothing |
| Links resolve | request each `/docs/...` link of the page from the dev server and expect 200; `bin/vawe check links` starts at `/` and does not crawl this app (2026-10-30) |
| `npm run build` passes | the build output |
| 1440 and 390 look right | `bin/vawe shot <url> --full`, then read both PNGs |
