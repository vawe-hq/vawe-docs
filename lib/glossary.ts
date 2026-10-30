import fs from 'node:fs';
import path from 'node:path';

export type GlossaryEntry = { id: string; term: string; definition: string };

const FILE = path.join(process.cwd(), 'content/docs/glossary.mdx');
const HEADING = /^### (.+?) \[#([a-z0-9-]+)\]\s*$/;

function plain(md: string): string {
  return md
    .replace(/<Term id="[^"]*">([^<]*)<\/Term>/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|`/g, '');
}

function firstSentence(text: string): string {
  const end = text.search(/\.(\s|$)/);
  return end < 0 ? text : text.slice(0, end + 1);
}

export function parseGlossary(source: string): Map<string, GlossaryEntry> {
  const entries = new Map<string, GlossaryEntry>();
  const lines = source.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const match = HEADING.exec(lines[i]);
    if (!match) continue;
    const [, term, id] = match;
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (entries.has(id)) throw new Error(`glossary.mdx: the id "${id}" is used twice`);
    entries.set(id, { id, term, definition: firstSentence(plain(lines[j] ?? '')) });
  }
  return entries;
}

let cache: Map<string, GlossaryEntry> | undefined;

export function glossaryEntry(id: string): GlossaryEntry {
  cache ??= parseGlossary(fs.readFileSync(FILE, 'utf8'));
  const entry = cache.get(id);
  if (!entry) throw new Error(`<Term id="${id}">: no "### <term> [#${id}]" heading in content/docs/glossary.mdx`);
  return entry;
}
