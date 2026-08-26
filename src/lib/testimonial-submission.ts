export const TESTIMONIAL_SUBMISSION_API_PATH = '/api/testimonials';
export const TESTIMONIAL_UPLOAD_API_PATH = '/api/testimonial-upload';
export const TESTIMONIAL_UPLOAD_PREFIX = 'testimonial-submissions/';

export const MAX_TESTIMONIAL_VIDEO_SIZE_BYTES = 100 * 1024 * 1024;
export const MAX_TESTIMONIAL_VIDEO_SIZE_LABEL = '100 MB';

export const ACCEPTED_TESTIMONIAL_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/x-m4v',
] as const;

export type TestimonialKind = 'written' | 'video';
export type TestimonialVideoMethod = 'upload' | 'link';

export type TestimonialSubmission = {
  kind: TestimonialKind;
  name: string;
  email: string;
  position: string;
  company: string;
  review: string;
  videoMethod: TestimonialVideoMethod;
  videoUrl: string;
  consent: boolean;
  /** Honeypot field. Real visitors never see or fill this. */
  website: string;
};

export const TESTIMONIAL_SUBMISSION_ERROR_CODES = {
  invalidSubmission: 'invalid_submission',
  deliveryNotConfigured: 'email_delivery_not_configured',
  deliveryFailed: 'email_delivery_failed',
} as const;

export const TESTIMONIAL_SUBMISSION_MESSAGES = {
  missingFields: 'Please add your name, email, position, and company.',
  invalidEmail: 'That email address doesn’t look right - mind checking it?',
  reviewTooShort: 'A few more words would help - please write at least 20 characters.',
  reviewTooLong: 'Please keep your written testimonial under 4,000 characters.',
  missingVideo: 'Please choose a video or paste a shareable video link.',
  invalidVideoUrl: 'Please use a full, secure link that starts with https://.',
  missingConsent: 'Please confirm that I may publish your testimonial.',
  unsupportedVideo: 'Please choose an MP4, MOV, M4V, or WebM video.',
  videoTooLarge: `Please keep the video under ${MAX_TESTIMONIAL_VIDEO_SIZE_LABEL}.`,
  uploading: 'Uploading your video…',
  sending: 'Sending your testimonial…',
} as const;

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PRIVATE_BLOB_HOST_SUFFIX = '.private.blob.vercel-storage.com';

export function createEmptyTestimonialSubmission(
  kind: TestimonialKind = 'written',
): TestimonialSubmission {
  return {
    kind,
    name: '',
    email: '',
    position: '',
    company: '',
    review: '',
    videoMethod: 'upload',
    videoUrl: '',
    consent: false,
    website: '',
  };
}

export function normalizeTestimonialSubmission(value: unknown): TestimonialSubmission {
  const source = (value ?? {}) as Partial<Record<keyof TestimonialSubmission, unknown>>;
  const readString = (field: keyof TestimonialSubmission) =>
    typeof source[field] === 'string' ? source[field].trim() : '';

  const kind = source.kind === 'video' ? 'video' : 'written';
  const videoMethod = source.videoMethod === 'link' ? 'link' : 'upload';

  return {
    kind,
    name: readString('name'),
    email: readString('email'),
    position: readString('position'),
    company: readString('company'),
    review: readString('review'),
    videoMethod,
    videoUrl: readString('videoUrl'),
    consent: source.consent === true,
    website: readString('website'),
  };
}

function hasValidCommonFields(submission: TestimonialSubmission): boolean {
  return Boolean(
    submission.name &&
      submission.email &&
      submission.position &&
      submission.company &&
      submission.name.length <= 120 &&
      submission.email.length <= 254 &&
      submission.position.length <= 160 &&
      submission.company.length <= 160,
  );
}

function isSecureUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function isExpectedTestimonialBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith(PRIVATE_BLOB_HOST_SUFFIX) &&
      url.pathname.startsWith(`/${TESTIMONIAL_UPLOAD_PREFIX}`)
    );
  } catch {
    return false;
  }
}

export function findTestimonialSubmissionValidationError(
  submission: TestimonialSubmission,
): string | null {
  if (!hasValidCommonFields(submission)) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.missingFields;
  }
  if (!EMAIL_PATTERN.test(submission.email)) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.invalidEmail;
  }

  if (submission.kind === 'written') {
    if (submission.review.length < 20) {
      return TESTIMONIAL_SUBMISSION_MESSAGES.reviewTooShort;
    }
    if (submission.review.length > 4000) {
      return TESTIMONIAL_SUBMISSION_MESSAGES.reviewTooLong;
    }
  } else {
    if (!submission.videoUrl) {
      return TESTIMONIAL_SUBMISSION_MESSAGES.missingVideo;
    }
    if (!isSecureUrl(submission.videoUrl)) {
      return TESTIMONIAL_SUBMISSION_MESSAGES.invalidVideoUrl;
    }
    if (
      submission.videoMethod === 'upload' &&
      !isExpectedTestimonialBlobUrl(submission.videoUrl)
    ) {
      return TESTIMONIAL_SUBMISSION_MESSAGES.invalidVideoUrl;
    }
  }

  if (!submission.consent) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.missingConsent;
  }

  return null;
}

/** Validates the metadata sent before a browser receives a short-lived upload token. */
export function findTestimonialUploadIntentValidationError(value: unknown): string | null {
  const submission = normalizeTestimonialSubmission(value);

  if (submission.website) return 'Unable to accept this upload.';
  if (
    submission.kind !== 'video' ||
    submission.videoMethod !== 'upload' ||
    !hasValidCommonFields(submission)
  ) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.missingFields;
  }
  if (!EMAIL_PATTERN.test(submission.email)) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.invalidEmail;
  }
  if (!submission.consent) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.missingConsent;
  }

  return null;
}

export function validateTestimonialVideoFile(file: File): string | null {
  if (!(ACCEPTED_TESTIMONIAL_VIDEO_TYPES as readonly string[]).includes(file.type)) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.unsupportedVideo;
  }
  if (file.size > MAX_TESTIMONIAL_VIDEO_SIZE_BYTES) {
    return TESTIMONIAL_SUBMISSION_MESSAGES.videoTooLarge;
  }
  return null;
}
