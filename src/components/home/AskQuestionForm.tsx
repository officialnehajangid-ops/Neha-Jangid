'use client';

import { useState, type FormEvent } from 'react';

import { ArrowRightIcon } from '@/components/ui/icons';
import { CONTACT_EMAIL } from '@/content/site';
import {
  ASK_QUESTION_API_PATH,
  ASK_QUESTION_ERROR_CODES,
  ASK_QUESTION_MESSAGES,
  createEmptyAskQuestionSubmission,
  findAskQuestionValidationError,
  normalizeAskQuestionSubmission,
  type AskQuestionSubmission,
} from '@/lib/ask-question';

/** Drives the `.err` / `.ok` colours on the note under the button. */
type NoteTone = 'err' | 'ok' | null;

type FormNote = {
  text: string;
  tone: NoteTone;
};

const HINT_NOTE: FormNote = { text: ASK_QUESTION_MESSAGES.hint, tone: null };

/**
 * Hands the question to the visitor's mail client. Used only when the API reports
 * that no inbox is configured yet, preserving the behaviour the static site had.
 */
function openMailClientWith(submission: AskQuestionSubmission): void {
  const subject = encodeURIComponent(`Organic growth question — ${submission.website}`);
  const body = encodeURIComponent(
    `Website: ${submission.website}\nEmail: ${submission.email}\n\nQuestion:\n${submission.question}\n`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function AskQuestionForm() {
  const [values, setValues] = useState<AskQuestionSubmission>(createEmptyAskQuestionSubmission);
  const [note, setNote] = useState<FormNote>(HINT_NOTE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof AskQuestionSubmission, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a complaint as soon as the visitor starts fixing it.
    setNote((current) => (current.tone === 'err' ? HINT_NOTE : current));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submission = normalizeAskQuestionSubmission(values);
    const validationError = findAskQuestionValidationError(submission);
    if (validationError) {
      setNote({ text: validationError, tone: 'err' });
      return;
    }

    setIsSubmitting(true);
    setNote({ text: ASK_QUESTION_MESSAGES.sending, tone: null });

    try {
      const response = await fetch(ASK_QUESTION_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setValues(createEmptyAskQuestionSubmission());
        setNote({
          text: `Thank you — your question is in. I’ll personally reply to ${submission.email}.`,
          tone: 'ok',
        });
        return;
      }

      const { error } = (await response.json().catch(() => ({}))) as { error?: string };

      if (error === ASK_QUESTION_ERROR_CODES.deliveryNotConfigured) {
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
        text: `Something went wrong sending that. Please email ${CONTACT_EMAIL} instead.`,
        tone: 'err',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="ask-form" onSubmit={handleSubmit} noValidate>
      <label>
        <span>Your website URL</span>
        <input
          type="url"
          name="website"
          placeholder="https://yourproduct.com"
          required
          value={values.website}
          onChange={(event) => updateField('website', event.target.value)}
        />
      </label>

      <label>
        <span>Your question</span>
        <textarea
          name="question"
          rows={4}
          placeholder="What’s the one thing you want answered?"
          required
          value={values.question}
          onChange={(event) => updateField('question', event.target.value)}
        />
      </label>

      <label>
        <span>Your email address</span>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
        />
      </label>

      <button type="submit" className="btn btn-accent btn-block" disabled={isSubmitting}>
        Ask your question
        <ArrowRightIcon />
      </button>

      <p className={`form-note${note.tone ? ` ${note.tone}` : ''}`}>{note.text}</p>
    </form>
  );
}
