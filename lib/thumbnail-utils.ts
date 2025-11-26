/**
 * Get the default thumbnail path for a content type
 */
export function getDefaultThumbnail(type: "note" | "video" | "pyq" | "important"): string {
  const thumbnails = {
    note: "/thumbnails/note-default.svg",
    video: "/thumbnails/video-default.svg",
    pyq: "/thumbnails/pyq-default.svg",
    important: "/thumbnails/important-default.svg",
  }
  
  return thumbnails[type]
}

/**
 * Get thumbnail URL with fallback to default
 */
export function getThumbnailUrl(
  thumbnail: string | undefined | null,
  type: "note" | "video" | "pyq" | "important"
): string {
  return thumbnail || getDefaultThumbnail(type)
}
