'use client';

import { useState } from 'react';

import { PlayIcon } from '@/components/ui/icons';
import {
  buildYouTubeEmbedUrl,
  buildYouTubeThumbnailUrl,
  type VideoTestimonial,
} from '@/content/testimonials';

/**
 * Thumbnail facade for a YouTube testimonial.
 *
 * The player is only mounted once the visitor presses play, which keeps four
 * embeds' worth of YouTube JavaScript off the critical path.
 */
export function VideoTestimonialCard({ testimonial }: { testimonial: VideoTestimonial }) {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  return (
    <button
      type="button"
      className="video-card"
      aria-label={`Play video testimonial ${testimonial.position}`}
      onClick={() => setIsPlayerLoaded(true)}
    >
      {isPlayerLoaded ? (
        <iframe
          src={buildYouTubeEmbedUrl(testimonial.youTubeVideoId)}
          title="Video testimonial"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Served straight from YouTube's CDN - routing it through the image
              optimizer would add a hop for an asset that is thrown away on click. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buildYouTubeThumbnailUrl(testimonial.youTubeVideoId)} alt="" loading="lazy" />
          <span className="video-play" aria-hidden="true">
            <PlayIcon />
          </span>
        </>
      )}
    </button>
  );
}
