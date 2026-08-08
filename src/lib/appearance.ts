/**
 * Appearance = the visitor's two personalisation choices:
 *
 *   1. `colorTheme`    — dark (brand default) or light, stored as `data-theme` on <html>.
 *   2. `accentScheme`  — which hue pair repaints every accent on the page: buttons,
 *                        gradients, glows, rails, links, numbers.
 *
 * Both are persisted in localStorage and re-applied before the first paint by the
 * bootstrap script in `buildAppearanceBootstrapScript()`, so a returning visitor
 * never sees the default teal flash past on the way to their chosen colour.
 */

export type ColorTheme = 'dark' | 'light';

export type AccentScheme = {
  /** Shown in the tooltip under the shuffle button. */
  readonly name: string;
  /** Hue of the primary accent, and of the gradient's first stop. */
  readonly primaryHue: number;
  /** Hue of the gradient's second stop. */
  readonly secondaryHue: number;
};

export type ResolvedAccentScheme = {
  /** CSS custom properties to write onto <html>. */
  readonly cssVariables: Record<string, string>;
  /** The primary accent as a hex string, for the shuffle tooltip. */
  readonly hex: string;
};

export const DEFAULT_COLOR_THEME: ColorTheme = 'dark';

/** Teal Signal is the brand default and must stay first. */
export const ACCENT_SCHEMES: readonly AccentScheme[] = [
  { name: 'Teal Signal', primaryHue: 172, secondaryHue: 190 },
  { name: 'Aurora Mint', primaryHue: 158, secondaryHue: 178 },
  { name: 'Cyan Wire', primaryHue: 190, secondaryHue: 206 },
  { name: 'Cobalt Rise', primaryHue: 218, secondaryHue: 234 },
  { name: 'Electric Iris', primaryHue: 256, secondaryHue: 280 },
  { name: 'Ultraviolet', primaryHue: 278, secondaryHue: 302 },
  { name: 'Magenta Pulse', primaryHue: 320, secondaryHue: 340 },
  { name: 'Rose Ember', primaryHue: 344, secondaryHue: 6 },
  { name: 'Coral Flare', primaryHue: 10, secondaryHue: 28 },
  { name: 'Solar Amber', primaryHue: 38, secondaryHue: 22 },
  { name: 'Lime Circuit', primaryHue: 86, secondaryHue: 108 },
  { name: 'Jade Deep', primaryHue: 148, secondaryHue: 168 },
];

export const DEFAULT_ACCENT_SCHEME = ACCENT_SCHEMES[0]!;

const STORAGE_KEYS = {
  colorTheme: 'nj-theme',
  accentSchemeName: 'nj-scheme',
} as const;

/**
 * Turns a scheme into the exact CSS custom properties the stylesheet expects.
 *
 * IMPORTANT: this function is serialised with `Function.prototype.toString()` into
 * the pre-hydration bootstrap script, so it must stay **self-contained** — it may
 * only reference its own parameters, locals and JavaScript built-ins. Reaching for
 * anything in module scope would throw once inlined into the <head>.
 */
export function resolveAccentScheme(
  scheme: AccentScheme,
  colorTheme: ColorTheme,
): ResolvedAccentScheme {
  const isLight = colorTheme === 'light';

  // Light backgrounds need a deeper accent to stay readable; dark ones need a brighter one.
  const saturation = isLight ? 78 : 85;
  const primaryLightness = isLight ? 38 : 57;
  const secondaryLightness = isLight ? 45 : 65;

  const primary = `hsl(${scheme.primaryHue} ${saturation}% ${primaryLightness}%)`;
  const secondary = `hsl(${scheme.secondaryHue} ${saturation}% ${secondaryLightness}%)`;

  const cssVariables = {
    '--accent': primary,
    '--accent-2': secondary,
    '--grad': `linear-gradient(120deg, ${primary} 0%, ${secondary} 100%)`,
    '--accent-soft': `hsl(${scheme.primaryHue} ${saturation}% ${primaryLightness}% / ${isLight ? 0.1 : 0.14})`,
    '--accent-line': `hsl(${scheme.primaryHue} ${saturation}% ${primaryLightness}% / 0.34)`,
    '--accent-ink': isLight ? '#ffffff' : `hsl(${scheme.primaryHue} 55% 8%)`,
  };

  // HSL -> hex, only so the tooltip can print the colour the visitor just landed on.
  const saturationRatio = saturation / 100;
  const lightnessRatio = primaryLightness / 100;
  const amplitude = saturationRatio * Math.min(lightnessRatio, 1 - lightnessRatio);
  const channel = (offset: number) => {
    const k = (offset + scheme.primaryHue / 30) % 12;
    const value = lightnessRatio - amplitude * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, '0');
  };

  return { cssVariables, hex: `#${channel(0)}${channel(8)}${channel(4)}` };
}

/** Writes a scheme's variables onto <html> and reports what was applied. */
export function applyAccentScheme(
  scheme: AccentScheme,
  colorTheme: ColorTheme,
): ResolvedAccentScheme {
  const resolved = resolveAccentScheme(scheme, colorTheme);
  const root = document.documentElement;

  for (const [property, value] of Object.entries(resolved.cssVariables)) {
    root.style.setProperty(property, value);
  }

  return resolved;
}

export function applyColorTheme(colorTheme: ColorTheme): void {
  document.documentElement.setAttribute('data-theme', colorTheme);
}

export function readStoredColorTheme(): ColorTheme {
  return localStorage.getItem(STORAGE_KEYS.colorTheme) === 'light' ? 'light' : DEFAULT_COLOR_THEME;
}

export function storeColorTheme(colorTheme: ColorTheme): void {
  localStorage.setItem(STORAGE_KEYS.colorTheme, colorTheme);
}

/** The visitor's saved scheme, or null when they have never shuffled. */
export function readStoredAccentScheme(): AccentScheme | null {
  const storedName = localStorage.getItem(STORAGE_KEYS.accentSchemeName);
  return ACCENT_SCHEMES.find((scheme) => scheme.name === storedName) ?? null;
}

export function storeAccentScheme(scheme: AccentScheme): void {
  localStorage.setItem(STORAGE_KEYS.accentSchemeName, scheme.name);
}

/** Shuffling should always visibly change something, so never return the current scheme. */
export function pickRandomAccentSchemeExcept(current: AccentScheme): AccentScheme {
  const alternatives = ACCENT_SCHEMES.filter((scheme) => scheme.name !== current.name);
  return alternatives[Math.floor(Math.random() * alternatives.length)] ?? current;
}

/**
 * Source for the blocking <script> rendered at the top of <body>.
 *
 * It runs before React hydrates and before the browser paints, so the stored
 * theme and accent are already in place on the very first frame. `resolveAccentScheme`
 * is inlined by serialising the real function, which keeps the colour maths in
 * exactly one place instead of being duplicated in a hand-written string.
 */
export function buildAppearanceBootstrapScript(): string {
  return [
    '(function(){try{',
    `var schemes=${JSON.stringify(ACCENT_SCHEMES)};`,
    `var resolveAccentScheme=${resolveAccentScheme.toString()};`,
    'var root=document.documentElement;',
    `var colorTheme=localStorage.getItem('${STORAGE_KEYS.colorTheme}')==='light'?'light':'${DEFAULT_COLOR_THEME}';`,
    "root.setAttribute('data-theme',colorTheme);",
    `var storedName=localStorage.getItem('${STORAGE_KEYS.accentSchemeName}');`,
    'var scheme=schemes.filter(function(item){return item.name===storedName})[0];',
    'if(!scheme)return;',
    'var cssVariables=resolveAccentScheme(scheme,colorTheme).cssVariables;',
    'for(var property in cssVariables)root.style.setProperty(property,cssVariables[property]);',
    '}catch(error){}})();',
  ].join('');
}
