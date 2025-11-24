/**
 * Theme utility functions for accessibility and contrast checking
 */

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  const lum1 = getLuminance(...color1);
  const lum2 = getLuminance(...color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function meetsWCAGAA(
  contrastRatio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standards
 * AAA requires 7:1 for normal text, 4.5:1 for large text
 */
export function meetsWCAGAAA(
  contrastRatio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
}

/**
 * Theme color pairs to verify for accessibility
 * These are approximate RGB values for our OKLCH colors
 */
export const themeColorPairs = {
  light: {
    background: [255, 255, 255] as [number, number, number],
    foreground: [37, 37, 37] as [number, number, number],
    primary: [52, 52, 52] as [number, number, number],
    primaryForeground: [251, 251, 251] as [number, number, number],
    muted: [247, 247, 247] as [number, number, number],
    mutedForeground: [142, 142, 142] as [number, number, number],
  },
  dark: {
    background: [37, 37, 37] as [number, number, number],
    foreground: [251, 251, 251] as [number, number, number],
    primary: [235, 235, 235] as [number, number, number],
    primaryForeground: [52, 52, 52] as [number, number, number],
    muted: [69, 69, 69] as [number, number, number],
    mutedForeground: [181, 181, 181] as [number, number, number],
  },
};

/**
 * Verify all theme color combinations meet accessibility standards
 */
export function verifyThemeAccessibility() {
  const results: Record<string, any> = {
    light: {},
    dark: {},
  };

  for (const [themeName, colors] of Object.entries(themeColorPairs)) {
    // Check background/foreground
    const bgFgRatio = getContrastRatio(colors.background, colors.foreground);
    results[themeName].backgroundForeground = {
      ratio: bgFgRatio.toFixed(2),
      meetsAA: meetsWCAGAA(bgFgRatio),
      meetsAAA: meetsWCAGAAA(bgFgRatio),
    };

    // Check primary/primary-foreground
    const primaryRatio = getContrastRatio(
      colors.primary,
      colors.primaryForeground
    );
    results[themeName].primaryForeground = {
      ratio: primaryRatio.toFixed(2),
      meetsAA: meetsWCAGAA(primaryRatio),
      meetsAAA: meetsWCAGAAA(primaryRatio),
    };

    // Check muted/muted-foreground
    const mutedRatio = getContrastRatio(colors.muted, colors.mutedForeground);
    results[themeName].mutedForeground = {
      ratio: mutedRatio.toFixed(2),
      meetsAA: meetsWCAGAA(mutedRatio),
      meetsAAA: meetsWCAGAAA(mutedRatio),
    };

    // Check background/muted-foreground (common for secondary text)
    const bgMutedFgRatio = getContrastRatio(
      colors.background,
      colors.mutedForeground
    );
    results[themeName].backgroundMutedForeground = {
      ratio: bgMutedFgRatio.toFixed(2),
      meetsAA: meetsWCAGAA(bgMutedFgRatio),
      meetsAAA: meetsWCAGAAA(bgMutedFgRatio),
    };
  }

  return results;
}
