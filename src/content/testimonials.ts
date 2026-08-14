export type VideoTestimonial = {
  /** YouTube video id - the player is only loaded once the facade is clicked. */
  readonly youTubeVideoId: string;
  /** Used for the button's accessible name. */
  readonly position: number;
};

export type WrittenTestimonial = {
  readonly quote: string;
  readonly authorName: string;
  readonly authorRole: string;
};

export const VIDEO_TESTIMONIALS: readonly VideoTestimonial[] = [
  { youTubeVideoId: 'FA9HyuKmG0I', position: 1 },
  { youTubeVideoId: 'fe6_FL-MdQ4', position: 2 },
  { youTubeVideoId: 'XYI_UWwjkto', position: 3 },
  { youTubeVideoId: '-RgG8pM4CGs', position: 4 },
];

export const WRITTEN_TESTIMONIALS: readonly WrittenTestimonial[] = [
  {
    quote:
      'It has been great working with Neha. She is super responsive, attentive to details and hard working. She helps us a lot with our SEO and content initiatives. I recommend her work to anyone looking to improve their online presence and SEO. Thanks, Neha!',
    authorName: 'Pedro',
    authorRole: 'Founder, Templated',
  },
  {
    quote:
      'I’ve been working with Neha on 2 of my products already: CaptureKit (got acquired), and SocialKit, my current product. It’s been awesome working with her; she’s professional, and the communication is great. Soon we’ll work again on a new SaaS of mine. So I really recommend her services :)',
    authorName: 'Jonathan',
    authorRole: 'Co-founder, PostPeer',
  },
];

export function buildYouTubeThumbnailUrl(youTubeVideoId: string): string {
  return `https://i.ytimg.com/vi/${youTubeVideoId}/hqdefault.jpg`;
}

/** Privacy-preserving embed, only requested after the visitor presses play. */
export function buildYouTubeEmbedUrl(youTubeVideoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youTubeVideoId}?autoplay=1&rel=0`;
}
