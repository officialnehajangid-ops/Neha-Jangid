import { buildAppearanceBootstrapScript } from '@/lib/appearance';

/**
 * Restores the visitor's saved theme and accent before the browser paints.
 *
 * This has to be a blocking inline script rather than an effect: React only runs
 * effects after hydration, by which point the page would already have flashed in
 * the default dark teal. Rendered as the first child of <body>.
 */
export function AppearanceBootstrapScript() {
  return (
    <script
      // The source is generated from typed functions in src/lib/appearance.ts,
      // never from user input.
      dangerouslySetInnerHTML={{ __html: buildAppearanceBootstrapScript() }}
    />
  );
}
