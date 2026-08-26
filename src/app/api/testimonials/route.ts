import { NextResponse } from 'next/server';

import { EmailDeliveryNotConfiguredError, sendTestimonialSubmissionEmail } from '@/lib/email';
import {
  TESTIMONIAL_SUBMISSION_ERROR_CODES,
  findTestimonialSubmissionValidationError,
  normalizeTestimonialSubmission,
} from '@/lib/testimonial-submission';

/** Receives a client testimonial for Neha to review before anything is published. */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const submission = normalizeTestimonialSubmission(payload);

  // Quietly discard automated submissions that fill the hidden honeypot field.
  if (submission.website) return NextResponse.json({ ok: true });

  const validationError = findTestimonialSubmissionValidationError(submission);
  if (validationError) {
    return NextResponse.json(
      {
        error: TESTIMONIAL_SUBMISSION_ERROR_CODES.invalidSubmission,
        message: validationError,
      },
      { status: 400 },
    );
  }

  try {
    await sendTestimonialSubmissionEmail(submission);
  } catch (error) {
    if (error instanceof EmailDeliveryNotConfiguredError) {
      return NextResponse.json(
        { error: TESTIMONIAL_SUBMISSION_ERROR_CODES.deliveryNotConfigured },
        { status: 503 },
      );
    }

    console.error('Failed to deliver a testimonial submission', error);
    return NextResponse.json(
      { error: TESTIMONIAL_SUBMISSION_ERROR_CODES.deliveryFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
