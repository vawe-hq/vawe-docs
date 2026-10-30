import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/callout';
import { Diagram, DiagramArrow, DiagramBox, DiagramText } from '@/components/diagram';
import { PageToFilm, TheLoop } from '@/components/diagrams';
import { Figure } from '@/components/figure';
import { Term } from '@/components/term';
import { Video } from '@/components/video';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Callout,
    Diagram,
    DiagramArrow,
    DiagramBox,
    DiagramText,
    Figure,
    PageToFilm,
    Step,
    Steps,
    Term,
    TheLoop,
    Video,
    ...components,
  };
}
