'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { mediaUrl } from '@/lib/media';

type VideoProps = {
  src: string;
  poster: string;
  caption?: string;
  /** What the clip shows, for a screen reader. Defaults to the caption. */
  label?: string;
  /** The clip's width:height, so the frame holds its size before the clip loads. */
  aspect?: string;
};

export function Video({ src, poster, caption, label, aspect = '16 / 9' }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWaiting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => setWaiting(true));
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function start() {
    setWaiting(false);
    ref.current?.play();
  }

  return (
    <figure className="vd-media not-prose">
      <div className="vd-frame" style={{ aspectRatio: aspect }}>
        <video
          ref={ref}
          src={mediaUrl(src)}
          poster={mediaUrl(poster)}
          aria-label={label ?? caption}
          muted
          loop
          playsInline
          controls={!waiting}
          preload="none"
        />
        {waiting && (
          <button type="button" className="vd-play" onClick={start} aria-label="Play the clip">
            <span>
              <Play size={22} fill="currentColor" aria-hidden />
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
