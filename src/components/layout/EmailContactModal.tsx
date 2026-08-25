'use client';

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';

import { ArrowRightIcon, CloseIcon, MailIcon } from '@/components/ui/icons';
import { CONTACT_EMAIL } from '@/content/site';
import {
  CONTACT_EMAIL_API_PATH,
  CONTACT_EMAIL_ERROR_CODES,
  CONTACT_EMAIL_MESSAGES,
  createEmptyContactEmailSubmission,
  findContactEmailValidationError,
  normalizeContactEmailSubmission,
  type ContactEmailSubmission,
} from '@/lib/contact-email';

type EmailContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormNote = {
  text: string;
  tone: 'err' | 'ok' | null;
};

const HINT_NOTE: FormNote = { text: CONTACT_EMAIL_MESSAGES.hint, tone: null };

function openMailClientWith(submission: ContactEmailSubmission): void {
  const subject = encodeURIComponent(submission.subject);
  const body = encodeURIComponent(
    `Name: ${submission.name}\nEmail: ${submission.email}\n\n${submission.message}\n`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function EmailContactModal({ isOpen, onClose }: EmailContactModalProps) {
  const [values, setValues] = useState<ContactEmailSubmission>(
    createEmptyContactEmailSubmission,
  );
  const [note, setNote] = useState<FormNote>(HINT_NOTE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  const updateField = (field: keyof ContactEmailSubmission, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setNote((current) => (current.tone === 'err' ? HINT_NOTE : current));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submission = normalizeContactEmailSubmission(values);
    const validationError = findContactEmailValidationError(submission);
    if (validationError) {
      setNote({ text: validationError, tone: 'err' });
      return;
    }

    setIsSubmitting(true);
    setNote({ text: CONTACT_EMAIL_MESSAGES.sending, tone: null });

    try {
      const response = await fetch(CONTACT_EMAIL_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setValues(createEmptyContactEmailSubmission());
        setNote({ text: `Thank you - your email has been sent to ${CONTACT_EMAIL}.`, tone: 'ok' });
        return;
      }

      const { error } = (await response.json().catch(() => ({}))) as { error?: string };
      if (error === CONTACT_EMAIL_ERROR_CODES.deliveryNotConfigured) {
        openMailClientWith(submission);
        setNote({
          text: `Opening your email app… if nothing happens, write to ${CONTACT_EMAIL}.`,
          tone: 'ok',
        });
        return;
      }

      throw new Error(error ?? response.statusText);
    } catch {
      setNote({
        text: `Something went wrong. Please email ${CONTACT_EMAIL} directly instead.`,
        tone: 'err',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-backdrop" onMouseDown={handleBackdropMouseDown}>
      <section
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button type="button" className="modal-close" aria-label="Close email form" onClick={onClose}>
          <CloseIcon />
        </button>

        <p className="eyebrow">Email Neha</p>
        <h2 id="contact-modal-title">Let’s start a conversation</h2>
        <p className="contact-modal-intro">
          Share a little context and I’ll reply personally. You can also email me directly at:
        </p>
        <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>
          <MailIcon />
          {CONTACT_EMAIL}
        </a>

        <form className="email-form" onSubmit={handleSubmit} noValidate>
          <div className="email-form-row">
            <label>
              <span>Your name</span>
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                value={values.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label>
              <span>Your email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                value={values.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </label>
          </div>

          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="How can I help?"
              required
              value={values.subject}
              onChange={(event) => updateField('subject', event.target.value)}
            />
          </label>

          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows={4}
              maxLength={4000}
              placeholder="Tell me about your SaaS, goals, or question…"
              required
              value={values.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-accent btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send email'}
            {!isSubmitting && <ArrowRightIcon />}
          </button>
          <p className={`form-note${note.tone ? ` ${note.tone}` : ''}`} aria-live="polite">
            {note.text}
          </p>
        </form>
      </section>
    </div>
  );
}
