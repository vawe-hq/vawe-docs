import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';
import remarkTypo from './lib/remark-typo.mjs';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      blog: z.array(z.object({ slug: z.string(), title: z.string() })).optional(),
      tocDepth: z.number().int().min(2).max(4).optional(),
    }),
    postprocess: { includeProcessedMarkdown: { headingIds: false } },
  },
});

export default defineConfig({
  mdxOptions: { remarkPlugins: [remarkTypo] },
});
