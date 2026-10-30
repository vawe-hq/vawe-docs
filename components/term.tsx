import type { ReactNode } from 'react';
import { glossaryEntry } from '@/lib/glossary';
import { TermLink } from './term-link';

export function Term({ id, children }: { id: string; children?: ReactNode }) {
  const entry = glossaryEntry(id);
  return (
    <TermLink href={`/docs/glossary#${id}`} definition={entry.definition}>
      {children ?? entry.term}
    </TermLink>
  );
}
