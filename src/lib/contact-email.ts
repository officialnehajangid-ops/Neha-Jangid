/** Shared contract for the header email form and its API route. */
export type ContactEmailSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const CONTACT_EMAIL_API_PATH = '/api/contact';

export const CONTACT_EMAIL_ERROR_CODES = {
  invalidSubmission: 'invalid_submission',
  deliveryNotConfigured: 'email_delivery_not_configured',
  deliveryFailed: 'email_delivery_failed',
} as const;

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export const CONTACT_EMAIL_MESSAGES = {
  hint: 'Your message will be sent directly to Neha.',
  missingFields: 'Please fill in your name, email, subject, and message.',
  invalidEmail: 'That email address doesn’t look right - mind checking it?',
  messageTooLong: 'Please keep your message under 4,000 characters.',
  sending: 'Sending…',
} as const;

export function createEmptyContactEmailSubmission(): ContactEmailSubmission {
  return { name: '', email: '', subject: '', message: '' };
}

/** Trims every field so the browser and API validate the same values. */
export function normalizeContactEmailSubmission(value: unknown): ContactEmailSubmission {
  const source = (value ?? {}) as Partial<Record<keyof ContactEmailSubmission, unknown>>;
  const readField = (field: keyof ContactEmailSubmission) =>
    typeof source[field] === 'string' ? source[field].trim() : '';

  return {
    name: readField('name'),
    email: readField('email'),
    subject: readField('subject'),
    message: readField('message'),
  };
}

export function findContactEmailValidationError(
  submission: ContactEmailSubmission,
): string | null {
  if (!submission.name || !submission.email || !submission.subject || !submission.message) {
    return CONTACT_EMAIL_MESSAGES.missingFields;
  }
  if (!EMAIL_PATTERN.test(submission.email)) {
    return CONTACT_EMAIL_MESSAGES.invalidEmail;
  }
  if (submission.message.length > 4000) {
    return CONTACT_EMAIL_MESSAGES.messageTooLong;
  }
  return null;
}
