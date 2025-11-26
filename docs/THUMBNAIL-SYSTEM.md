# Thumbnail System

## Overview
The platform now has a comprehensive default thumbnail system for content that doesn't have custom thumbnails.

## Features

### 1. Dynamic Default Thumbnails
- **Component**: `components/content/default-thumbnail.tsx`
- Generates beautiful, themed thumbnails on-the-fly
- Supports dark mode
- Includes decorative elements (gradients, circles, grid patterns)
- Type-specific colors and icons

### 2. Static SVG Thumbnails
Located in `public/thumbnails/`:
- `note-default.svg` - Blue themed for notes
- `video-default.svg` - Purple themed for videos
- `pyq-default.svg` - Teal themed for past year questions
- `important-default.svg` - Orange themed for important questions

### 3. Utility Functions
**File**: `lib/thumbnail-utils.ts`

```typescript
// Get default thumbnail path
getDefaultThumbnail(type: "note" | "video" | "pyq" | "important"): string

// Get thumbnail with fallback
getThumbnailUrl(thumbnail: string | undefined, type: string): string
```

## Usage

### In Components

```tsx
import { DefaultThumbnail } from "@/components/content/default-thumbnail"

// Use dynamic component
<DefaultThumbnail type="note" />

// Or use utility for Image component
import { getThumbnailUrl } from "@/lib/thumbnail-utils"
<Image src={getThumbnailUrl(content.thumbnail, content.type)} />
```

### Current Implementation

The following components now use default thumbnails:
- ✅ `components/content/content-card.tsx` - Content cards
- ✅ `components/home/recent-uploads.tsx` - Homepage recent uploads

## Color Scheme

| Type | Light Mode | Dark Mode |
|------|-----------|-----------|
| Note | Blue 500 → Blue 600 | Blue 700 → Blue 800 |
| Video | Purple 500 → Purple 600 | Purple 700 → Purple 800 |
| PYQ | Teal 500 → Teal 600 | Teal 700 → Teal 800 |
| Important | Orange 500 → Orange 600 | Orange 700 → Orange 800 |

**Background Colors:**
- Light mode: Type-specific light shades (50-100)
- Dark mode: Slate 900 → Slate 800 (consistent across all types)

## Benefits

1. **Better UX**: No broken images or empty placeholders
2. **Visual Consistency**: All content has attractive thumbnails
3. **Type Recognition**: Users can quickly identify content types
4. **Performance**: SVG files are lightweight and scalable
5. **Dark Mode**: Automatically adapts to theme

## Future Enhancements

- [ ] Add thumbnail generation API for uploaded PDFs
- [ ] Extract video thumbnails from YouTube links
- [ ] Allow users to upload custom thumbnails
- [ ] Generate thumbnails from first page of PDFs
- [ ] Add more thumbnail variations
