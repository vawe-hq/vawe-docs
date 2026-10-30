'use client';

import { useId, type ReactNode } from 'react';

export function TermLink({ href, definition, children }: { href: string; definition: string; children: ReactNode }) {
  const tipId = useId();
  return (
    <span className="vd-term">
      <a href={href} aria-describedby={tipId}>
        {children}
      </a>
      <span className="vd-term-tip" role="tooltip" id={tipId}>
        {definition}
      </span>
    </span>
  );
}
