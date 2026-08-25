import { NextResponse } from 'next/server';

import {
  CONTACT_EMAIL_ERROR_CODES,
  findContactEmailValidationError,
  normalizeContactEmailSubmission,
} from '@/lib/contact-email';
import { EmailDeliveryNotConfiguredError, sendContactEmail } from '@/lib/email';

/** Receives a message from the header email form and delivers it to Neha. */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const submission = normalizeContactEmailSubmission(payload);
  const validationError = findContactEmailValidationError(submission);

  if (validationError) {
    return NextResponse.json(
      { error: CONTACT_EMAIL_ERROR_CODES.invalidSubmission, message: validationError },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(submission);
  } catch (error) {
    if (error instanceof EmailDeliveryNotConfiguredError) {
      return NextResponse.json(
        { error: CONTACT_EMAIL_ERROR_CODES.deliveryNotConfigured },
        { status: 503 },
      );
    }

    console.error('Failed to deliver a contact email submission', error);
    return NextResponse.json(
      { error: CONTACT_EMAIL_ERROR_CODES.deliveryFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
