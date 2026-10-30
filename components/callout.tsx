import type { ReactNode } from 'react';
import { Info, Scale, TriangleAlert } from 'lucide-react';

type Kind = 'note' | 'warning' | 'rule';

const ICONS = { note: Info, warning: TriangleAlert, rule: Scale };
const TITLES = { note: 'Note', warning: 'Warning', rule: 'Rule' };

// The fumadocs names that pages written before DESIGN.md use.
const LEGACY: Record<string, Kind> = { info: 'note', tip: 'note', idea: 'note', success: 'note', warn: 'warning', error: 'warning' };

type CalloutProps = {
  kind?: Kind;
  type?: string;
  title?: string;
  children: ReactNode;
};

export function Callout({ kind, type, title, children }: CalloutProps) {
  const k: Kind = kind ?? (type ? (LEGACY[type] ?? (type as Kind)) : 'note');
  if (!(k in ICONS)) throw new Error(`Callout: unknown kind "${k}"; use note, warning or rule`);
  const Icon = ICONS[k];
  return (
    <aside className="vd-callout not-prose" data-kind={k}>
      <Icon aria-hidden />
      <div className="vd-callout-body prose">
        <strong className="vd-callout-title">{title ?? TITLES[k]}</strong>
        {children}
      </div>
    </aside>
  );
}
