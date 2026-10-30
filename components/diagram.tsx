import type { ReactNode } from 'react';

type DiagramProps = {
  /** One sentence that says what the reader must see. */
  caption?: string;
  /** The same content as a text sentence, for a screen reader. */
  label: string;
  /** A second drawing for a column under 640 px, so no label renders under 12 px. */
  narrow?: ReactNode;
  children: ReactNode;
};

export function Diagram({ caption, label, narrow, children }: DiagramProps) {
  return (
    <figure className="vd-media vd-diagram not-prose">
      <div className="vd-frame" role="img" aria-label={label}>
        <div className="dg-wide">{children}</div>
        {narrow && <div className="dg-narrow">{narrow}</div>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

type Accent = { accent?: boolean };
const cls = (base: string, accent?: boolean) => (accent ? `${base} dg-accent` : base);

export function DiagramBox({ x, y, w, h, accent }: { x: number; y: number; w: number; h: number } & Accent) {
  return <rect className={cls('dg-box', accent)} x={x + 0.5} y={y + 0.5} width={w} height={h} rx={8} />;
}

type TextKind = 'label' | 'mono' | 'num';

export function DiagramText({
  x,
  y,
  kind = 'label',
  anchor = 'start',
  accent,
  children,
}: { x: number; y: number; kind?: TextKind; anchor?: 'start' | 'middle' | 'end'; children: ReactNode } & Accent) {
  return (
    <text className={cls(`dg-${kind}`, accent)} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">
      {children}
    </text>
  );
}

/** A path from the first point to the last, through the middle points, with a head on the last segment. */
export function DiagramArrow({ points, accent }: { points: [number, number][] } & Accent) {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const head = (da: number) => `${x2 - 8 * Math.cos(a + da)},${y2 - 8 * Math.sin(a + da)}`;
  return (
    <g>
      <polyline className={cls('dg-line', accent)} points={points.map((p) => p.join(',')).join(' ')} strokeLinejoin="round" />
      <polygon className={cls('dg-head', accent)} points={`${x2},${y2} ${head(0.45)} ${head(-0.45)}`} />
    </g>
  );
}
