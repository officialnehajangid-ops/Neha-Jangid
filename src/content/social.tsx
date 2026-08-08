import type { ComponentType } from 'react';

import { FiverrIcon, LinkedInIcon, UpworkIcon, type IconProps } from '@/components/ui/icons';
import { EXTERNAL_LINKS } from '@/content/site';

export type SocialProfile = {
  readonly label: string;
  readonly href: string;
  readonly Icon: ComponentType<IconProps>;
};

/** Shown as icon buttons under the final CTA and as text links in the footer. */
export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { label: 'LinkedIn', href: EXTERNAL_LINKS.linkedIn, Icon: LinkedInIcon },
  { label: 'Upwork', href: EXTERNAL_LINKS.upwork, Icon: UpworkIcon },
  { label: 'Fiverr', href: EXTERNAL_LINKS.fiverr, Icon: FiverrIcon },
];
