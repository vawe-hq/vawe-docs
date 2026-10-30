import { Diagram, DiagramArrow, DiagramBox, DiagramText } from './diagram';

function SeekPill({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect className="dg-pill" x={cx - 42} y={cy - 13} width={84} height={26} rx={13} />
      <DiagramText x={cx} y={cy + 1} kind="mono" anchor="middle" accent>
        seek(t)
      </DiagramText>
    </g>
  );
}

function Node({ x, y, w, h, title, lines }: { x: number; y: number; w: number; h: number; title: string; lines: string[] }) {
  return (
    <g>
      <DiagramBox x={x} y={y} w={w} h={h} />
      <DiagramText x={x + 16} y={y + 28}>{title}</DiagramText>
      {lines.map((line, i) => (
        <DiagramText key={line} x={x + 16} y={y + 54 + i * 22} kind="mono">
          {line}
        </DiagramText>
      ))}
    </g>
  );
}

export function PageToFilm({ caption }: { caption?: string }) {
  const narrow = (
    <svg viewBox="0 0 361 331">
      <Node x={0} y={0} w={360} h={70} title="Page" lines={['page.html: HTML, CSS, SVG']} />
      <DiagramArrow points={[[180, 71], [180, 129]]} accent />
      <SeekPill cx={180} cy={100} />
      <Node x={0} y={130} w={360} h={70} title="Frame at t" lines={['one PNG per t']} />
      <DiagramArrow points={[[180, 201], [180, 259]]} />
      <DiagramText x={194} y={230} kind="mono">every t</DiagramText>
      <Node x={0} y={260} w={360} h={70} title="Film" lines={['out/<name>.mp4']} />
    </svg>
  );
  return (
    <Diagram
      label="A page goes to the renderer. The renderer seeks the page to a time t and captures one frame. It does this for every t and writes the frames to one mp4 film."
      caption={caption}
      narrow={narrow}
    >
      <svg viewBox="0 0 681 121">
        <Node x={0} y={0} w={150} h={120} title="Page" lines={['page.html', 'HTML, CSS, SVG']} />
        <DiagramArrow points={[[151, 60], [259, 60]]} accent />
        <SeekPill cx={205} cy={60} />
        <Node x={260} y={0} w={170} h={120} title="Frame at t" lines={['one PNG', 'same t, same PNG']} />
        <DiagramArrow points={[[431, 60], [519, 60]]} />
        <DiagramText x={475} y={44} kind="mono" anchor="middle">every t</DiagramText>
        <Node x={520} y={0} w={160} h={120} title="Film" lines={['out/<name>.mp4']} />
      </svg>
    </Diagram>
  );
}

const STAGES: [string, string][] = [
  ['Brief', 'new'],
  ['References', 'refs'],
  ['Design kit', 'DESIGN.md'],
  ['States', 'frames'],
  ['Board', 'storyboard'],
  ['Draft', 'dev'],
  ['Motion pass', 'strip'],
  ['Critique', 'critique'],
  ['Fix', 'dev --from'],
  ['Final', 'ship'],
];

const CELL = 124;
const GAP = 15;
const ROW = 84;
const ROW_GAP = 40;

export function TheLoop({ caption }: { caption?: string }) {
  const cellX = (i: number) => (i % 5) * (CELL + GAP);
  const cellY = (i: number) => Math.floor(i / 5) * (ROW + ROW_GAP);
  const fixMid = cellX(8) + CELL / 2;
  const critiqueMid = cellX(7) + CELL / 2;
  const row2Bottom = cellY(5) + ROW;

  const narrow = (
    <svg viewBox="0 0 361 473">
      {STAGES.map(([name, verb], i) => {
        const y = i * 48;
        return (
          <g key={name}>
            <DiagramBox x={0} y={y} w={300} h={40} />
            <DiagramText x={14} y={y + 21} kind="num">{String(i + 1).padStart(2, '0')}</DiagramText>
            <DiagramText x={46} y={y + 21}>{name}</DiagramText>
            <DiagramText x={288} y={y + 21} kind="mono" anchor="end">{verb}</DiagramText>
          </g>
        );
      })}
      <DiagramArrow points={[[301, 8 * 48 + 20], [336, 8 * 48 + 20], [336, 7 * 48 + 20], [303, 7 * 48 + 20]]} accent />
    </svg>
  );

  return (
    <Diagram
      label="The loop has ten stages: brief, references, design kit, states, board, draft, motion pass, critique, fix and final. Critique and fix repeat until the critique passes."
      caption={caption}
      narrow={narrow}
    >
      <svg viewBox="0 0 681 251">
        {STAGES.map(([name, verb], i) => {
          const x = cellX(i);
          const y = cellY(i);
          return (
            <g key={name}>
              <DiagramBox x={x} y={y} w={CELL} h={ROW} />
              <DiagramText x={x + 12} y={y + 18} kind="num">{String(i + 1).padStart(2, '0')}</DiagramText>
              <DiagramText x={x + 12} y={y + 44}>{name}</DiagramText>
              <DiagramText x={x + 12} y={y + 66} kind="mono">{verb}</DiagramText>
              {i % 5 !== 4 && <DiagramArrow points={[[x + CELL + 1, y + ROW / 2], [x + CELL + GAP, y + ROW / 2]]} />}
            </g>
          );
        })}
        <DiagramArrow
          points={[[cellX(4) + CELL / 2, ROW + 1], [cellX(4) + CELL / 2, ROW + ROW_GAP / 2], [CELL / 2, ROW + ROW_GAP / 2], [CELL / 2, ROW + ROW_GAP]]}
        />
        <DiagramArrow points={[[fixMid, row2Bottom + 1], [fixMid, row2Bottom + 22], [critiqueMid, row2Bottom + 22], [critiqueMid, row2Bottom + 3]]} accent />
        <DiagramText x={(fixMid + critiqueMid) / 2} y={row2Bottom + 36} kind="mono" anchor="middle" accent>
          until it passes
        </DiagramText>
      </svg>
    </Diagram>
  );
}
