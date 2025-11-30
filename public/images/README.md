# Hero Background Image

## Setup Instructions

1. Save the flying papers image as `flying-papers-bg.jpg` in this directory
2. The image will automatically be used as the hero section background
3. The opacity is set to 30% in light mode and 20% in dark mode for optimal text readability

## Current Implementation

- Background image with gradient overlay
- Works seamlessly with both light and dark themes
- Maintains the flying papers animation on top
- Fully responsive across all devices

## Customization

To adjust the background image appearance, edit `components/home/hero-section.tsx`:
- Change opacity: Modify `opacity-30 dark:opacity-20`
- Remove gradient overlay: Delete the gradient overlay div
- Remove flying papers animation: Remove the `<FlyingPapers />` component
