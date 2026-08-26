import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

import {
  ACCEPTED_TESTIMONIAL_VIDEO_TYPES,
  MAX_TESTIMONIAL_VIDEO_SIZE_BYTES,
  TESTIMONIAL_UPLOAD_PREFIX,
  findTestimonialUploadIntentValidationError,
} from '@/lib/testimonial-submission';

const TEN_MINUTES_IN_MILLISECONDS = 10 * 60 * 1000;

/** Creates a short-lived, tightly scoped token for direct-to-Blob video uploads. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
  }

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (
          !pathname.startsWith(TESTIMONIAL_UPLOAD_PREFIX) ||
          pathname.includes('..')
        ) {
          throw new Error('Invalid upload path.');
        }

        let uploadIntent: unknown = null;
        try {
          uploadIntent = clientPayload ? JSON.parse(clientPayload) : null;
        } catch {
          throw new Error('Invalid upload details.');
        }

        const validationError = findTestimonialUploadIntentValidationError(uploadIntent);
        if (validationError) throw new Error(validationError);

        return {
          allowedContentTypes: [...ACCEPTED_TESTIMONIAL_VIDEO_TYPES],
          maximumSizeInBytes: MAX_TESTIMONIAL_VIDEO_SIZE_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + TEN_MINUTES_IN_MILLISECONDS,
          tokenPayload: JSON.stringify({ source: 'testimonial-form' }),
        };
      },
      onUploadCompleted: async () => {
        // The form sends the resulting URL to Neha after the browser upload finishes.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to upload this video.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
