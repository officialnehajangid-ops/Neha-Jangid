'use client';

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';

import { ArrowLeftIcon, CloseIcon, PlayIcon } from '@/components/ui/icons';
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
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const cardButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const dialogTitleId = `video-testimonial-${testimonial.position}-title`;

  useEffect(() => {
    if (!isPlayerOpen) return;

    const cardButton = cardButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => backButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsPlayerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      cardButton?.focus();
    };
  }, [isPlayerOpen]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setIsPlayerOpen(false);
  };

  const handleDialogPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setIsPlayerOpen(false);
  };

  return (
    <>
      <button
        ref={cardButtonRef}
        type="button"
        className="video-card"
        aria-label={`Open video testimonial ${testimonial.position} in a large player`}
        aria-haspopup="dialog"
        aria-expanded={isPlayerOpen}
        onClick={() => setIsPlayerOpen(true)}
      >
        <>
          {/* Served straight from YouTube's CDN - routing it through the image
              optimizer would add a hop for an asset that is thrown away on click. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buildYouTubeThumbnailUrl(testimonial.youTubeVideoId)} alt="" loading="lazy" />
          <span className="video-play" aria-hidden="true">
            <PlayIcon />
          </span>
          <span className="video-card-hint" aria-hidden="true">
            Watch full testimonial
          </span>
        </>
      </button>

      {isPlayerOpen && (
        <div className="video-lightbox-backdrop" onMouseDown={handleBackdropMouseDown}>
          <div
            className="video-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            onPointerLeave={handleDialogPointerLeave}
          >
            <div className="video-lightbox-toolbar">
              <button
                ref={backButtonRef}
                type="button"
                className="video-lightbox-back"
                onClick={() => setIsPlayerOpen(false)}
              >
                <ArrowLeftIcon />
                Back to testimonials
              </button>
              <p id={dialogTitleId}>Video testimonial {testimonial.position}</p>
              <button
                type="button"
                className="video-lightbox-close"
                aria-label="Close video"
                onClick={() => setIsPlayerOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="video-lightbox-player">
              <iframe
                src={buildYouTubeEmbedUrl(testimonial.youTubeVideoId)}
                title={`Video testimonial ${testimonial.position}`}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
