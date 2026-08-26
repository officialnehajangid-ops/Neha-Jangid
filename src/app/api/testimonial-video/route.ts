import { get } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';

import { verifyTestimonialVideoReviewRequest } from '@/lib/testimonial-video-access';

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname') ?? '';
  const expiresAt = request.nextUrl.searchParams.get('expires') ?? '';
  const signature = request.nextUrl.searchParams.get('signature') ?? '';
  const range = request.headers.get('range');

  try {
    if (!verifyTestimonialVideoReviewRequest(pathname, expiresAt, signature)) {
      return new NextResponse('This private review link is invalid or has expired.', {
        status: 403,
      });
    }

    const result = await get(pathname, {
      access: 'private',
      headers: range ? { Range: range } : undefined,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return new NextResponse('Video not found.', { status: 404 });
    }

    const contentRange = result.headers.get('content-range');
    const contentLength = result.headers.get('content-length');
    const etag = result.headers.get('etag');
    const lastModified = result.headers.get('last-modified');

    return new NextResponse(result.stream, {
      status: contentRange ? 206 : 200,
      headers: {
        'Content-Type': result.blob.contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${pathname.split('/').pop() || 'testimonial-video'}"`,
        'Cache-Control': 'private, no-store',
        'Accept-Ranges': result.headers.get('accept-ranges') || 'bytes',
        ...(contentRange ? { 'Content-Range': contentRange } : {}),
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
        ...(etag ? { ETag: etag } : {}),
        ...(lastModified ? { 'Last-Modified': lastModified } : {}),
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Failed to open a private testimonial video', error);
    return new NextResponse('Unable to open this private video.', { status: 503 });
  }
}
