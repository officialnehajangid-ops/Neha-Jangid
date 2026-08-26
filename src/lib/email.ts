import 'server-only';

import { CONTACT_EMAIL } from '@/content/site';
import type { AskQuestionSubmission } from '@/lib/ask-question';
import type { ContactEmailSubmission } from '@/lib/contact-email';
import type { TestimonialSubmission } from '@/lib/testimonial-submission';
import { createTestimonialVideoReviewUrl } from '@/lib/testimonial-video-access';

const RESEND_EMAILS_ENDPOINT = 'https://api.resend.com/emails';

/**
 * Thrown when no mail provider credentials are present. The API turns this into
 * a distinct status so the form can fall back to the visitor's mail client,
 * which is how the site behaved before it had a backend.
 */
export class EmailDeliveryNotConfiguredError extends Error {
  constructor() {
    super('Email delivery is not configured. See RESEND_* variables in .env.example.');
    this.name = 'EmailDeliveryNotConfiguredError';
  }
}

export class EmailDeliveryFailedError extends Error {
  constructor(reason: string) {
    super(`Email delivery failed: ${reason}`);
    this.name = 'EmailDeliveryFailedError';
  }
}

type EmailDeliveryConfig = {
  apiKey: string;
  fromAddress: string;
  inboxAddress: string;
};

function readEmailDeliveryConfig(): EmailDeliveryConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const resendDomain = process.env.RESEND_EMAIL_DOMAIN?.trim();
  const fromAddress =
    process.env.ASK_FORM_FROM_EMAIL ||
    (resendDomain ? `Neha Jangid Website <website@${resendDomain}>` : undefined);
  const inboxAddress = process.env.ASK_FORM_INBOX_EMAIL || CONTACT_EMAIL;

  if (!apiKey || !fromAddress) throw new EmailDeliveryNotConfiguredError();

  return { apiKey, fromAddress, inboxAddress };
}

function buildQuestionEmailBody(submission: AskQuestionSubmission): string {
  return [
    `Website: ${submission.website}`,
    `Email: ${submission.email}`,
    '',
    'Question:',
    submission.question,
    '',
  ].join('\n');
}

/**
 * Delivers one "ask a question" submission to the configured inbox.
 *
 * Uses Resend's REST API directly rather than its SDK - one fetch call keeps the
 * dependency list short and makes the provider trivial to swap later.
 */
export async function sendAskQuestionEmail(submission: AskQuestionSubmission): Promise<void> {
  const { apiKey, fromAddress, inboxAddress } = readEmailDeliveryConfig();

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [inboxAddress],
      // So a reply from the inbox goes straight back to the visitor.
      reply_to: submission.email,
      subject: `Organic growth question - ${submission.website}`,
      text: buildQuestionEmailBody(submission),
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryFailedError(`${response.status} ${response.statusText}`);
  }
}

/** Delivers a message from the header email form to the same configured inbox. */
export async function sendContactEmail(submission: ContactEmailSubmission): Promise<void> {
  const { apiKey, fromAddress, inboxAddress } = readEmailDeliveryConfig();

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [inboxAddress],
      reply_to: submission.email,
      subject: `Website enquiry - ${submission.subject}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        '',
        'Message:',
        submission.message,
        '',
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryFailedError(`${response.status} ${response.statusText}`);
  }
}

function buildTestimonialEmailBody(submission: TestimonialSubmission): string {
  const lines = [
    `Type: ${submission.kind === 'written' ? 'Written testimonial' : 'Video testimonial'}`,
    `Name: ${submission.name}`,
    `Position: ${submission.position}`,
    `Company: ${submission.company}`,
    `Email: ${submission.email}`,
    '',
  ];

  if (submission.kind === 'written') {
    lines.push('Testimonial:', submission.review);
  } else {
    const reviewUrl =
      submission.videoMethod === 'upload'
        ? createTestimonialVideoReviewUrl(submission.videoUrl)
        : submission.videoUrl;
    lines.push(
      `Video provided by: ${submission.videoMethod === 'upload' ? 'Website upload' : 'Shareable link'}`,
      `Video: ${reviewUrl}`,
      submission.videoMethod === 'upload'
        ? 'Private review link: expires in 30 days.'
        : 'The client supplied this external share link.',
    );
  }

  lines.push(
    '',
    'Publication permission: Confirmed',
    'Status: Awaiting your review - nothing was published automatically.',
    '',
  );

  return lines.join('\n');
}

/** Delivers a written or video testimonial to Neha for manual approval. */
export async function sendTestimonialSubmissionEmail(
  submission: TestimonialSubmission,
): Promise<void> {
  const { apiKey, fromAddress, inboxAddress } = readEmailDeliveryConfig();
  const typeLabel = submission.kind === 'written' ? 'written' : 'video';

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [inboxAddress],
      reply_to: submission.email,
      subject: `New ${typeLabel} testimonial - ${submission.name}, ${submission.company}`,
      text: buildTestimonialEmailBody(submission),
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryFailedError(`${response.status} ${response.statusText}`);
  }
}
