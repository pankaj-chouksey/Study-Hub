/**
 * Downloads a file as PDF with correct MIME type and .pdf extension.
 * Ensures the browser saves as PDF even when the server sends wrong Content-Type.
 */
export async function downloadAsPdf(
  fileUrl: string,
  filename: string
): Promise<void> {
  // Ensure filename has .pdf and is safe (no path, no query)
  const baseName = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_.\s]/g, "_").trim() || "document"
  const safeFilename = baseName.endsWith(".pdf") ? baseName : `${baseName}.pdf`

  const link = document.createElement("a")
  link.download = safeFilename
  link.target = "_blank"
  link.rel = "noopener noreferrer"

  try {
    const response = await fetch(fileUrl)
    const blob = await response.blob()
    // Force PDF MIME type so the browser saves with .pdf extension
    const pdfBlob =
      blob.type === "application/pdf"
        ? blob
        : new Blob([await blob.arrayBuffer()], { type: "application/pdf" })
    const blobUrl = URL.createObjectURL(pdfBlob)
    link.href = blobUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 200)
  } catch {
    // Fallback: open in new tab (user can save from there)
    link.href = fileUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/** Get a safe PDF filename from URL or title */
export function getPdfFilenameFromUrl(url: string): string {
  try {
    const pathname = url.split("?")[0]
    const segment = pathname.split("/").filter(Boolean).pop() || ""
    if (segment.toLowerCase().endsWith(".pdf")) return segment
    return "document.pdf"
  } catch {
    return "document.pdf"
  }
}
