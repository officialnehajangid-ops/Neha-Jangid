'use client';

import { useEffect, useRef, useState } from 'react';

import { PaletteIcon } from '@/components/ui/icons';
import type { ShuffleResult } from '@/hooks/useAppearance';

/** Matches the `shuffle-spin` keyframes duration in the stylesheet. */
const SPIN_DURATION_IN_MS = 650;
const TOOLTIP_DURATION_IN_MS = 1800;

type AccentShuffleButtonProps = {
  onShuffle: () => ShuffleResult;
};

export function AccentShuffleButton({ onShuffle }: AccentShuffleButtonProps) {
  const [shuffledAccent, setShuffledAccent] = useState<ShuffleResult | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  /**
   * Bumped on every click and used as the icon's key. Remounting the SVG is what
   * makes the spin animation replay when the button is clicked again mid-spin.
   */
  const [spinToken, setSpinToken] = useState(0);

  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(spinTimeoutRef.current);
      clearTimeout(tooltipTimeoutRef.current);
    },
    [],
  );

  const handleClick = () => {
    setShuffledAccent(onShuffle());

    setSpinToken((token) => token + 1);
    setIsSpinning(true);
    clearTimeout(spinTimeoutRef.current);
    spinTimeoutRef.current = setTimeout(() => setIsSpinning(false), SPIN_DURATION_IN_MS);

    setIsTooltipVisible(true);
    clearTimeout(tooltipTimeoutRef.current);
    tooltipTimeoutRef.current = setTimeout(() => setIsTooltipVisible(false), TOOLTIP_DURATION_IN_MS);
  };

  return (
    <div className="shuffle-wrap">
      <button
        type="button"
        id="colorBtn"
        className={`icon-btn${isSpinning ? ' spinning' : ''}`}
        aria-label="Shuffle accent colour"
        onClick={handleClick}
      >
        <PaletteIcon key={spinToken} />
      </button>

      {/* Kept mounted so the tooltip can fade out rather than disappear. */}
      <div
        className={`shuffle-tip${isTooltipVisible ? ' show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {shuffledAccent && (
          <>
            <span className="tip-name">{shuffledAccent.name}</span>
            <span className="tip-hex">{shuffledAccent.hex}</span>
          </>
        )}
      </div>
    </div>
  );
}
