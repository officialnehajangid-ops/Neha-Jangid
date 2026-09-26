'use client';

import { useState } from 'react';

import { EmailContactModal } from '@/components/layout/EmailContactModal';
import { ArrowRightIcon } from '@/components/ui/icons';

type CaseStudyEmailCtaProps = {
  label: string;
};

export function CaseStudyEmailCta({ label }: CaseStudyEmailCtaProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-accent btn-lg"
        onClick={() => setIsEmailModalOpen(true)}
      >
        {label}
        <ArrowRightIcon />
      </button>

      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </>
  );
}
