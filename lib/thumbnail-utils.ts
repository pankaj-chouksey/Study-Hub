import { ContentType } from "./types"

/**
 * Get the default thumbnail path for a content type
 */
export function getDefaultThumbnail(type: ContentType): string {
  const thumbnails: Record<ContentType, string> = {
    note: "/thumbnails/note-default.svg",
    video: "/thumbnails/video-default.svg",
    pyq: "/thumbnails/pyq-default.svg",
    important: "/thumbnails/important-default.svg",
    syllabus: "/thumbnails/note-default.svg", // Using note thumbnail as fallback
    timetable: "/thumbnails/note-default.svg", // Using note thumbnail as fallback
  }
  
  return thumbnails[type]
}

/**
 * Get thumbnail URL with fallback to default
 */
export function getThumbnailUrl(
  thumbnail: string | undefined | null,
  type: ContentType
): string {
  return thumbnail || getDefaultThumbnail(type)
}
