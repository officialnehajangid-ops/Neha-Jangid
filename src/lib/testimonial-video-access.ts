import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

import { SITE_URL } from '@/content/site';
import { TESTIMONIAL_UPLOAD_PREFIX } from '@/lib/testimonial-submission';

const REVIEW_LINK_LIFETIME_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;
const MAXIMUM_ACCEPTED_LINK_AGE_IN_MILLISECONDS = 31 * 24 * 60 * 60 * 1000;

function readReviewSecret(): string {
  const secret = process.env.TESTIMONIAL_REVIEW_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error('TESTIMONIAL_REVIEW_SECRET is not configured.');
  }
  return secret;
}

function sign(pathname: string, expiresAt: number): string {
  return createHmac('sha256', readReviewSecret())
    .update(`${pathname}.${expiresAt}`)
    .digest('base64url');
}

function isSafeTestimonialPathname(pathname: string): boolean {
  return pathname.startsWith(TESTIMONIAL_UPLOAD_PREFIX) && !pathname.includes('..');
}

export function createTestimonialVideoReviewUrl(blobUrl: string): string {
  const pathname = new URL(blobUrl).pathname.replace(/^\/+/, '');
  if (!isSafeTestimonialPathname(pathname)) {
    throw new Error('Invalid testimonial video path.');
  }

  const expiresAt = Date.now() + REVIEW_LINK_LIFETIME_IN_MILLISECONDS;
  const url = new URL('/api/testimonial-video', SITE_URL);
  url.searchParams.set('pathname', pathname);
  url.searchParams.set('expires', String(expiresAt));
  url.searchParams.set('signature', sign(pathname, expiresAt));
  return url.toString();
}

export function verifyTestimonialVideoReviewRequest(
  pathname: string,
  expiresAtValue: string,
  signature: string,
): boolean {
  if (!isSafeTestimonialPathname(pathname)) return false;

  const expiresAt = Number(expiresAtValue);
  const now = Date.now();
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= now ||
    expiresAt > now + MAXIMUM_ACCEPTED_LINK_AGE_IN_MILLISECONDS
  ) {
    return false;
  }

  const expected = Buffer.from(sign(pathname, expiresAt));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
