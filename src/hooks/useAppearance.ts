'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  applyAccentScheme,
  applyColorTheme,
  DEFAULT_ACCENT_SCHEME,
  DEFAULT_COLOR_THEME,
  pickRandomAccentSchemeExcept,
  readStoredAccentScheme,
  readStoredColorTheme,
  storeAccentScheme,
  storeColorTheme,
  type AccentScheme,
  type ColorTheme,
} from '@/lib/appearance';

export type ShuffleResult = {
  readonly name: string;
  readonly hex: string;
};

export type Appearance = {
  readonly colorTheme: ColorTheme;
  readonly toggleColorTheme: () => void;
  /** Repaints the page in a new accent and reports it, for the tooltip. */
  readonly shuffleAccentScheme: () => ShuffleResult;
};

/**
 * React-side owner of the visitor's theme and accent choices.
 *
 * The DOM is already correct on first paint thanks to the bootstrap script, so
 * this hook only mirrors the stored values into state and takes over from the
 * first interaction onwards. Call it once, high in the tree — `SiteHeader` owns
 * both controls, so both stay in sync without a context.
 */
export function useAppearance(): Appearance {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(DEFAULT_COLOR_THEME);
  const [accentScheme, setAccentScheme] = useState<AccentScheme>(DEFAULT_ACCENT_SCHEME);
  /**
   * Visitors who have never shuffled keep the stylesheet's own accent tokens, which
   * are hand-tuned per theme. Only once they have picked a scheme do we override
   * those tokens — and re-mix them whenever the theme flips.
   */
  const [hasChosenAccentScheme, setHasChosenAccentScheme] = useState(false);

  useEffect(() => {
    setColorTheme(readStoredColorTheme());

    const storedAccentScheme = readStoredAccentScheme();
    if (storedAccentScheme) {
      setAccentScheme(storedAccentScheme);
      setHasChosenAccentScheme(true);
    }
  }, []);

  const toggleColorTheme = useCallback(() => {
    const nextColorTheme: ColorTheme = colorTheme === 'light' ? 'dark' : 'light';

    applyColorTheme(nextColorTheme);
    storeColorTheme(nextColorTheme);
    setColorTheme(nextColorTheme);

    if (hasChosenAccentScheme) applyAccentScheme(accentScheme, nextColorTheme);
  }, [accentScheme, colorTheme, hasChosenAccentScheme]);

  const shuffleAccentScheme = useCallback((): ShuffleResult => {
    const nextAccentScheme = pickRandomAccentSchemeExcept(accentScheme);
    const { hex } = applyAccentScheme(nextAccentScheme, colorTheme);

    storeAccentScheme(nextAccentScheme);
    setAccentScheme(nextAccentScheme);
    setHasChosenAccentScheme(true);

    return { name: nextAccentScheme.name, hex };
  }, [accentScheme, colorTheme]);

  return { colorTheme, toggleColorTheme, shuffleAccentScheme };
}
