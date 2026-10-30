import { mediaUrl } from '@/lib/media';

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="vd-media not-prose">
      <div className="vd-frame" style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}>
        <img src={mediaUrl(src)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
