import { VideoTestimonialCard } from '@/components/home/VideoTestimonialCard';
import { QuoteMarkIcon } from '@/components/ui/icons';
import { HOME_SECTION_IDS } from '@/content/site';
import { VIDEO_TESTIMONIALS, WRITTEN_TESTIMONIALS } from '@/content/testimonials';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

export function TestimonialsSection() {
  return (
    <section id={HOME_SECTION_IDS.voices} className="section">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            What SaaS founders &amp; teams <span className="grad">say about us</span>
          </h2>
          <p className="sec-lede">
            Hear directly from founders and marketing teams about the thinking, communication, and
            outcomes behind our work.
          </p>
        </header>

        <div className={`video-grid ${REVEAL_CLASS_NAME}`}>
          {VIDEO_TESTIMONIALS.map((testimonial) => (
            <VideoTestimonialCard key={testimonial.youTubeVideoId} testimonial={testimonial} />
          ))}
        </div>

        <div className="quote-grid">
          {WRITTEN_TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.authorName} className={`quote-card ${REVEAL_CLASS_NAME}`}>
              <QuoteMarkIcon className="q-mark" />
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <span className="q-name">{testimonial.authorName}</span>
                <span className="q-role">{testimonial.authorRole}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
