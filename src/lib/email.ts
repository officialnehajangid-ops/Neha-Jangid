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

function getTestimonialVideoDetails(submission: TestimonialSubmission) {
  const url =
    submission.videoMethod === 'upload'
      ? createTestimonialVideoReviewUrl(submission.videoUrl)
      : submission.videoUrl;

  return {
    url,
    sourceLabel: submission.videoMethod === 'upload' ? 'Private website upload' : 'Shared video link',
    note:
      submission.videoMethod === 'upload'
        ? 'This private viewing link expires in 30 days.'
        : 'This is the Drive, Loom, Dropbox, or YouTube link supplied by the client.',
  };
}

function buildTestimonialEmailBody(submission: TestimonialSubmission): string {
  const lines = [
    'NEW CLIENT TESTIMONIAL',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Position: ${submission.position}`,
    `Company: ${submission.company}`,
    `Submission type: ${submission.kind === 'written' ? 'Written testimonial' : 'Video testimonial'}`,
    '',
  ];

  if (submission.kind === 'written') {
    lines.push('FULL WRITTEN REVIEW', '', submission.review);
  } else {
    const video = getTestimonialVideoDetails(submission);
    lines.push(
      'VIDEO TESTIMONIAL',
      '',
      `Video source: ${video.sourceLabel}`,
      `Open video: ${video.url}`,
      video.note,
    );
  }

  lines.push('', `Reply directly to this email to contact ${submission.name}.`, '');

  return lines.join('\n');
}

function escapeEmailHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#039;';
    }
  });
}

function formatMultilineEmailHtml(value: string): string {
  return escapeEmailHtml(value).replace(/\r?\n/g, '<br>');
}

function buildTestimonialEmailHtml(submission: TestimonialSubmission): string {
  const typeLabel = submission.kind === 'written' ? 'Written testimonial' : 'Video testimonial';
  const name = escapeEmailHtml(submission.name);
  const email = escapeEmailHtml(submission.email);
  const position = escapeEmailHtml(submission.position);
  const company = escapeEmailHtml(submission.company);

  const testimonialContent =
    submission.kind === 'written'
      ? `
        <h2 style="margin:0 0 12px;font-size:18px;line-height:1.35;color:#171717;">Full written review</h2>
        <div style="padding:20px;border:1px solid #f0c7bb;border-radius:14px;background:#fff8f5;color:#2f2f2f;font-size:16px;line-height:1.7;word-break:break-word;">
          ${formatMultilineEmailHtml(submission.review)}
        </div>`
      : (() => {
          const video = getTestimonialVideoDetails(submission);
          const videoUrl = escapeEmailHtml(video.url);
          return `
            <h2 style="margin:0 0 12px;font-size:18px;line-height:1.35;color:#171717;">Video testimonial</h2>
            <div style="padding:20px;border:1px solid #f0c7bb;border-radius:14px;background:#fff8f5;">
              <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6;"><strong style="color:#262626;">Video source:</strong> ${escapeEmailHtml(video.sourceLabel)}</p>
              <a href="${videoUrl}" style="display:inline-block;padding:12px 20px;border-radius:999px;background:#c53b17;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">Open video testimonial →</a>
              <p style="margin:16px 0 6px;color:#555;font-size:13px;line-height:1.5;">${escapeEmailHtml(video.note)}</p>
              <p style="margin:0;word-break:break-all;font-size:13px;line-height:1.5;"><a href="${videoUrl}" style="color:#b33416;">${videoUrl}</a></p>
            </div>`;
        })();

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f3;font-family:Arial,Helvetica,sans-serif;color:#262626;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Full ${typeLabel.toLowerCase()} from ${name} at ${company}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f3;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e8e5e2;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px 24px;border-bottom:1px solid #eee9e5;">
                <p style="margin:0 0 8px;color:#c53b17;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">New client testimonial</p>
                <h1 style="margin:0;color:#171717;font-size:26px;line-height:1.25;">${name} · ${company}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 30px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.5;">
                  <tr><td style="width:120px;padding:7px 12px 7px 0;color:#777;">Name</td><td style="padding:7px 0;color:#222;font-weight:600;">${name}</td></tr>
                  <tr><td style="width:120px;padding:7px 12px 7px 0;color:#777;">Email</td><td style="padding:7px 0;"><a href="mailto:${email}" style="color:#b33416;">${email}</a></td></tr>
                  <tr><td style="width:120px;padding:7px 12px 7px 0;color:#777;">Position</td><td style="padding:7px 0;color:#222;">${position}</td></tr>
                  <tr><td style="width:120px;padding:7px 12px 7px 0;color:#777;">Company</td><td style="padding:7px 0;color:#222;">${company}</td></tr>
                  <tr><td style="width:120px;padding:7px 12px 7px 0;color:#777;">Type</td><td style="padding:7px 0;color:#222;">${typeLabel}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px 30px;">
                ${testimonialContent}
                <p style="margin:22px 0 0;color:#777;font-size:13px;line-height:1.5;">Reply directly to this email to contact ${name}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Delivers a written or video testimonial with complete client details. */
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
      subject: `New ${typeLabel} testimonial from ${submission.name} - ${submission.company}`,
      text: buildTestimonialEmailBody(submission),
      html: buildTestimonialEmailHtml(submission),
    }),
  });

  if (!response.ok) {
    throw new EmailDeliveryFailedError(`${response.status} ${response.statusText}`);
  }
}
