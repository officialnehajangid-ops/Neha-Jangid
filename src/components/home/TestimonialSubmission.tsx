'use client';

import { upload } from '@vercel/blob/client';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type MouseEvent,
} from 'react';

import {
  ArrowRightIcon,
  CheckCircleIcon,
  CloseIcon,
  LinkIcon,
  PlayIcon,
  QuoteMarkIcon,
  UploadCloudIcon,
} from '@/components/ui/icons';
import { CONTACT_EMAIL } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';
import {
  ACCEPTED_TESTIMONIAL_VIDEO_TYPES,
  MAX_TESTIMONIAL_VIDEO_SIZE_LABEL,
  TESTIMONIAL_SUBMISSION_API_PATH,
  TESTIMONIAL_SUBMISSION_MESSAGES,
  TESTIMONIAL_UPLOAD_API_PATH,
  TESTIMONIAL_UPLOAD_PREFIX,
  createEmptyTestimonialSubmission,
  findTestimonialSubmissionValidationError,
  findTestimonialUploadIntentValidationError,
  normalizeTestimonialSubmission,
  validateTestimonialVideoFile,
  type TestimonialKind,
  type TestimonialSubmission,
  type TestimonialVideoMethod,
} from '@/lib/testimonial-submission';

type FormNote = {
  text: string;
  tone: 'err' | 'ok' | null;
};

const DEFAULT_NOTE: FormNote = {
  text: 'Nothing is published automatically. I review every submission first.',
  tone: null,
};

const MULTIPART_UPLOAD_THRESHOLD_BYTES = 100 * 1024 * 1024;

function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024 * 1024) return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function buildUploadPath(fileName: string): string {
  const safeFileName = fileName
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(-100);

  return `${TESTIMONIAL_UPLOAD_PREFIX}${Date.now()}-${safeFileName || 'testimonial-video'}`;
}

export function TestimonialSubmission() {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [values, setValues] = useState<TestimonialSubmission>(
    createEmptyTestimonialSubmission,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [note, setNote] = useState<FormNote>(DEFAULT_NOTE);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
    isCompleteRef.current = isComplete;
  }, [isSubmitting, isComplete]);

  useEffect(() => {
    if (!isOpen) return;

    const openButton = openButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmittingRef.current) {
        setIsOpen(false);
        if (isCompleteRef.current) {
          setValues(createEmptyTestimonialSubmission());
          setSelectedFile(null);
          setUploadedVideoUrl('');
          setUploadProgress(0);
          setNote(DEFAULT_NOTE);
          setIsComplete(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      openButton?.focus();
    };
  }, [isOpen]);

  const updateField = <Field extends keyof TestimonialSubmission>(
    field: Field,
    value: TestimonialSubmission[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setNote((current) => (current.tone === 'err' ? DEFAULT_NOTE : current));
  };

  const chooseKind = (kind: TestimonialKind) => {
    setValues((current) => ({ ...current, kind }));
    setNote(DEFAULT_NOTE);
    setIsComplete(false);
  };

  const chooseVideoMethod = (videoMethod: TestimonialVideoMethod) => {
    setValues((current) => ({ ...current, videoMethod, videoUrl: '' }));
    setSelectedFile(null);
    setUploadedVideoUrl('');
    setUploadProgress(0);
    setNote(DEFAULT_NOTE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const chooseFile = (file: File | null) => {
    if (!file) return;

    const validationError = validateTestimonialVideoFile(file);
    if (validationError) {
      setSelectedFile(null);
      setUploadedVideoUrl('');
      setNote({ text: validationError, tone: 'err' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
    setUploadedVideoUrl('');
    setUploadProgress(0);
    setNote(DEFAULT_NOTE);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    chooseFile(event.target.files?.[0] ?? null);
  };

  const handleFileDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    chooseFile(event.dataTransfer.files?.[0] ?? null);
  };

  const resetForm = () => {
    setValues(createEmptyTestimonialSubmission());
    setSelectedFile(null);
    setUploadedVideoUrl('');
    setUploadProgress(0);
    setNote(DEFAULT_NOTE);
    setIsComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    if (isComplete) resetForm();
  };

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let submission = normalizeTestimonialSubmission(values);

    if (submission.kind === 'video' && submission.videoMethod === 'upload') {
      const uploadIntentError = findTestimonialUploadIntentValidationError(submission);
      if (uploadIntentError) {
        setNote({ text: uploadIntentError, tone: 'err' });
        return;
      }

      if (!selectedFile && !uploadedVideoUrl) {
        setNote({ text: TESTIMONIAL_SUBMISSION_MESSAGES.missingVideo, tone: 'err' });
        return;
      }

      if (selectedFile) {
        const fileError = validateTestimonialVideoFile(selectedFile);
        if (fileError) {
          setNote({ text: fileError, tone: 'err' });
          return;
        }
      }
    } else {
      const validationError = findTestimonialSubmissionValidationError(submission);
      if (validationError) {
        setNote({ text: validationError, tone: 'err' });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (
        submission.kind === 'video' &&
        submission.videoMethod === 'upload' &&
        selectedFile &&
        !uploadedVideoUrl
      ) {
        setNote({ text: TESTIMONIAL_SUBMISSION_MESSAGES.uploading, tone: null });

        const blob = await upload(buildUploadPath(selectedFile.name), selectedFile, {
          access: 'private',
          handleUploadUrl: TESTIMONIAL_UPLOAD_API_PATH,
          clientPayload: JSON.stringify(submission),
          multipart: selectedFile.size >= MULTIPART_UPLOAD_THRESHOLD_BYTES,
          onUploadProgress: ({ percentage }) => {
            const roundedProgress = Math.round(percentage);
            setUploadProgress(roundedProgress);
            setNote({ text: `Uploading your video… ${roundedProgress}%`, tone: null });
          },
        });

        setUploadedVideoUrl(blob.url);
        submission = { ...submission, videoUrl: blob.url };
      } else if (submission.kind === 'video' && submission.videoMethod === 'upload') {
        submission = { ...submission, videoUrl: uploadedVideoUrl };
      }

      const finalValidationError = findTestimonialSubmissionValidationError(submission);
      if (finalValidationError) throw new Error(finalValidationError);

      setNote({ text: TESTIMONIAL_SUBMISSION_MESSAGES.sending, tone: null });
      const response = await fetch(TESTIMONIAL_SUBMISSION_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(body.message || response.statusText);
      }

      setIsComplete(true);
      setNote({ text: 'Your testimonial is in my inbox.', tone: 'ok' });
    } catch (error) {
      const isKnownMessage =
        error instanceof Error &&
        Object.values(TESTIMONIAL_SUBMISSION_MESSAGES).some(
          (knownMessage) => knownMessage === error.message,
        );
      const fallbackMessage =
        submission.kind === 'video' && submission.videoMethod === 'upload'
          ? 'The video upload didn’t finish. Please try again, or choose “Paste a link” instead.'
          : `Something went wrong. Please email ${CONTACT_EMAIL} and I’ll help.`;
      const message = isKnownMessage && error instanceof Error ? error.message : fallbackMessage;
      setNote({ text: message, tone: 'err' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <aside className={`testimonial-invite ${REVEAL_CLASS_NAME}`}>
        <div className="testimonial-invite-copy">
          <p className="eyebrow">Worked with me?</p>
          <h3>Share your experience</h3>
          <p>
            A few honest words can help another SaaS team feel confident about working together.
            Choose written or video - whatever feels easiest.
          </p>
        </div>
        <button
          ref={openButtonRef}
          type="button"
          className="btn btn-accent testimonial-invite-button"
          onClick={() => setIsOpen(true)}
        >
          Leave a testimonial
          <ArrowRightIcon />
        </button>
      </aside>

      {isOpen && (
        <div className="testimonial-modal-backdrop" onMouseDown={handleBackdropMouseDown}>
          <section
            className="testimonial-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close testimonial form"
              disabled={isSubmitting}
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            {isComplete ? (
              <div className="testimonial-success" role="status">
                <span className="testimonial-success-icon" aria-hidden="true">
                  <CheckCircleIcon size={30} />
                </span>
                <p className="eyebrow">Thank you</p>
                <h2 id="testimonial-modal-title">It’s in my inbox</h2>
                <p>
                  Your {values.kind} testimonial was sent successfully. I’ll review it and reach
                  out before anything is published.
                </p>
                <button type="button" className="btn btn-accent" onClick={closeModal}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Share a testimonial</p>
                <h2 id="testimonial-modal-title">What was it like working together?</h2>
                <p className="testimonial-modal-intro">
                  Choose the format that feels natural. There’s no need for polished wording -
                  your honest experience is what matters.
                </p>

                <div className="testimonial-kind-tabs" role="group" aria-label="Testimonial format">
                  <button
                    type="button"
                    aria-pressed={values.kind === 'written'}
                    className={values.kind === 'written' ? 'is-active' : ''}
                    onClick={() => chooseKind('written')}
                  >
                    <QuoteMarkIcon size={22} />
                    <span>
                      <strong>Written</strong>
                      <small>Share a few thoughtful words</small>
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={values.kind === 'video'}
                    className={values.kind === 'video' ? 'is-active' : ''}
                    onClick={() => chooseKind('video')}
                  >
                    <PlayIcon size={21} />
                    <span>
                      <strong>Video</strong>
                      <small>Upload a file or share a link</small>
                    </span>
                  </button>
                </div>

                <form className="testimonial-form" onSubmit={handleSubmit} noValidate>
                  <div className="testimonial-form-row">
                    <label>
                      <span>Name</span>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        maxLength={120}
                        required
                        value={values.name}
                        onChange={(event) => updateField('name', event.target.value)}
                      />
                    </label>
                    <label>
                      <span>Email <em>Private</em></span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        maxLength={254}
                        required
                        value={values.email}
                        onChange={(event) => updateField('email', event.target.value)}
                      />
                    </label>
                  </div>

                  <div className="testimonial-form-row">
                    <label>
                      <span>Position</span>
                      <input
                        type="text"
                        name="position"
                        autoComplete="organization-title"
                        placeholder="Founder, Head of Growth…"
                        maxLength={160}
                        required
                        value={values.position}
                        onChange={(event) => updateField('position', event.target.value)}
                      />
                    </label>
                    <label>
                      <span>Company</span>
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder="Company name"
                        maxLength={160}
                        required
                        value={values.company}
                        onChange={(event) => updateField('company', event.target.value)}
                      />
                    </label>
                  </div>

                  {values.kind === 'written' ? (
                    <label>
                      <span>Your review</span>
                      <textarea
                        name="review"
                        rows={6}
                        minLength={20}
                        maxLength={4000}
                        placeholder="What stood out? You might mention the experience, communication, quality of work, or the outcome."
                        required
                        value={values.review}
                        onChange={(event) => updateField('review', event.target.value)}
                      />
                      <small className="testimonial-field-help">
                        A few specific details are more helpful than perfect wording.
                      </small>
                    </label>
                  ) : (
                    <div className="testimonial-video-fields">
                      <div className="testimonial-video-methods" role="group" aria-label="Video delivery method">
                        <button
                          type="button"
                          className={values.videoMethod === 'upload' ? 'is-active' : ''}
                          aria-pressed={values.videoMethod === 'upload'}
                          onClick={() => chooseVideoMethod('upload')}
                        >
                          <UploadCloudIcon />
                          Upload video
                        </button>
                        <button
                          type="button"
                          className={values.videoMethod === 'link' ? 'is-active' : ''}
                          aria-pressed={values.videoMethod === 'link'}
                          onClick={() => chooseVideoMethod('link')}
                        >
                          <LinkIcon />
                          Paste a link
                        </button>
                      </div>

                      {values.videoMethod === 'upload' ? (
                        <label
                          className={`testimonial-upload-zone${selectedFile ? ' has-file' : ''}`}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={handleFileDrop}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            name="video"
                            accept={ACCEPTED_TESTIMONIAL_VIDEO_TYPES.join(',')}
                            disabled={isSubmitting}
                            onChange={handleFileChange}
                          />
                          <span className="testimonial-upload-icon" aria-hidden="true">
                            {selectedFile ? <CheckCircleIcon /> : <UploadCloudIcon />}
                          </span>
                          {selectedFile ? (
                            <span>
                              <strong>{selectedFile.name}</strong>
                              <small>{formatFileSize(selectedFile.size)} · Click to replace</small>
                            </span>
                          ) : (
                            <span>
                              <strong>Choose a video or drop it here</strong>
                              <small>MP4, MOV, M4V, or WebM · up to {MAX_TESTIMONIAL_VIDEO_SIZE_LABEL}</small>
                            </span>
                          )}
                        </label>
                      ) : (
                        <label>
                          <span>Shareable video link</span>
                          <div className="testimonial-link-input">
                            <LinkIcon />
                            <input
                              type="url"
                              name="videoUrl"
                              inputMode="url"
                              placeholder="https://drive.google.com/..."
                              required
                              value={values.videoUrl}
                              onChange={(event) => updateField('videoUrl', event.target.value)}
                            />
                          </div>
                          <small className="testimonial-field-help">
                            Google Drive, Loom, Dropbox, or an unlisted YouTube link all work. Please enable viewing access.
                          </small>
                        </label>
                      )}
                    </div>
                  )}

                  <label className="testimonial-consent">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(event) => updateField('consent', event.target.checked)}
                    />
                    <span>
                      I’m happy for you to review this testimonial and, with my approval, publish it
                      on your website or marketing channels.
                    </span>
                  </label>

                  <label className="testimonial-honeypot" aria-hidden="true">
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(event) => updateField('website', event.target.value)}
                    />
                  </label>

                  {isSubmitting && values.kind === 'video' && values.videoMethod === 'upload' && (
                    <div className="testimonial-upload-progress" aria-hidden="true">
                      <span style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}

                  <button type="submit" className="btn btn-accent btn-block" disabled={isSubmitting}>
                    {isSubmitting
                      ? values.kind === 'video' && values.videoMethod === 'upload'
                        ? `Uploading${uploadProgress ? ` ${uploadProgress}%` : '…'}`
                        : 'Sending…'
                      : values.kind === 'written'
                        ? 'Send written testimonial'
                        : values.videoMethod === 'upload'
                          ? 'Upload & send video'
                          : 'Send video testimonial'}
                    {!isSubmitting && <ArrowRightIcon />}
                  </button>

                  <p className={`form-note${note.tone ? ` ${note.tone}` : ''}`} aria-live="polite">
                    {note.text}
                  </p>
                  <p className="testimonial-private-note">
                    Your email stays private. Uploaded videos are kept in private storage and the review link expires after 30 days.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
