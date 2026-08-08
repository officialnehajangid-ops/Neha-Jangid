import { NextResponse } from 'next/server';

import {
  ASK_QUESTION_ERROR_CODES,
  findAskQuestionValidationError,
  normalizeAskQuestionSubmission,
} from '@/lib/ask-question';
import { EmailDeliveryNotConfiguredError, sendAskQuestionEmail } from '@/lib/email';

/**
 * Receives one "Ask one organic growth question" submission and emails it on.
 *
 * Validation is repeated here rather than trusted from the browser, using the
 * same rules the form applies, so the endpoint is safe to call directly.
 */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const submission = normalizeAskQuestionSubmission(payload);

  const validationError = findAskQuestionValidationError(submission);
  if (validationError) {
    return NextResponse.json(
      { error: ASK_QUESTION_ERROR_CODES.invalidSubmission, message: validationError },
      { status: 400 },
    );
  }

  try {
    await sendAskQuestionEmail(submission);
  } catch (error) {
    if (error instanceof EmailDeliveryNotConfiguredError) {
      // Not the visitor's problem, and recoverable: the form opens their mail client.
      return NextResponse.json(
        { error: ASK_QUESTION_ERROR_CODES.deliveryNotConfigured },
        { status: 503 },
      );
    }

    console.error('Failed to deliver an ask-a-question submission', error);
    return NextResponse.json(
      { error: ASK_QUESTION_ERROR_CODES.deliveryFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
