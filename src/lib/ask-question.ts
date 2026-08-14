/**
 * Shared contract for the "Ask one organic growth question" form.
 *
 * Imported by both the browser form and the /api/ask route handler so the two
 * always agree on the payload shape, the validation rules and the wording the
 * visitor sees. When the backend moves to Fastify, this file is the interface
 * that moves with it.
 */

export type AskQuestionSubmission = {
  website: string;
  question: string;
  email: string;
};

export const ASK_QUESTION_API_PATH = '/api/ask';

/** Machine-readable reasons the API can refuse or fail a submission. */
export const ASK_QUESTION_ERROR_CODES = {
  invalidSubmission: 'invalid_submission',
  deliveryNotConfigured: 'email_delivery_not_configured',
  deliveryFailed: 'delivery_failed',
} as const;

export type AskQuestionErrorCode =
  (typeof ASK_QUESTION_ERROR_CODES)[keyof typeof ASK_QUESTION_ERROR_CODES];

/** Deliberately permissive: the server round-trip is the real check. */
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export const ASK_QUESTION_MESSAGES = {
  hint: 'One question per submission. The more context you share, the more useful I can make my answer.',
  missingFields: 'Please fill in your website, your question, and your email address.',
  invalidEmail: 'That email address doesn’t look right - mind checking it?',
  sending: 'Sending…',
} as const;

export function createEmptyAskQuestionSubmission(): AskQuestionSubmission {
  return { website: '', question: '', email: '' };
}

/** Trims every field so validation and delivery see the same values. */
export function normalizeAskQuestionSubmission(value: unknown): AskQuestionSubmission {
  const source = (value ?? {}) as Partial<Record<keyof AskQuestionSubmission, unknown>>;
  const readField = (field: keyof AskQuestionSubmission) =>
    typeof source[field] === 'string' ? source[field].trim() : '';

  return {
    website: readField('website'),
    question: readField('question'),
    email: readField('email'),
  };
}

/** Returns a visitor-facing message, or null when the submission is good to send. */
export function findAskQuestionValidationError(
  submission: AskQuestionSubmission,
): string | null {
  if (!submission.website || !submission.question || !submission.email) {
    return ASK_QUESTION_MESSAGES.missingFields;
  }
  if (!EMAIL_PATTERN.test(submission.email)) {
    return ASK_QUESTION_MESSAGES.invalidEmail;
  }
  return null;
}
