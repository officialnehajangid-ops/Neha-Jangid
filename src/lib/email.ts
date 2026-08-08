import 'server-only';

import type { AskQuestionSubmission } from '@/lib/ask-question';

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
  const fromAddress = process.env.ASK_FORM_FROM_EMAIL;
  const inboxAddress = process.env.ASK_FORM_INBOX_EMAIL;

  if (!apiKey || !fromAddress || !inboxAddress) throw new EmailDeliveryNotConfiguredError();

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
 * Uses Resend's REST API directly rather than its SDK — one fetch call keeps the
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
      subject: `Organic growth question — ${submission.website}`,
      text: buildQuestionEmailBody(submission),
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryFailedError(`${response.status} ${response.statusText}`);
  }
}
