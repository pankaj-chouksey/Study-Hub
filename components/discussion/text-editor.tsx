"use client"

import { useState } from "react"
import { Bold, Italic, List, Link as LinkIcon, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSubmit?: () => void
  submitLabel?: string
  isSubmitting?: boolean
  className?: string
  minHeight?: string
}

export function TextEditor({
  value,
  onChange,
  placeholder = "Write your comment...",
  onSubmit,
  submitLabel = "Post",
  isSubmitting = false,
  className,
  minHeight = "min-h-[120px]"
}: TextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFormat = (format: string) => {
    // Simple formatting helper - in production, use a rich text editor library
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    let formattedText = ""
    let newCursorPos = start

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        newCursorPos = start + 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        newCursorPos = start + 1
        break
      case "list":
        formattedText = `- ${selectedText}`
        newCursorPos = start + 2
        break
      case "code":
        formattedText = `\`${selectedText}\``
        newCursorPos = start + 1
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        newCursorPos = start + selectedText.length + 3
        break
      default:
        return
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newValue)

    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && onSubmit) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Formatting Toolbar */}
      {isFocused && (
        <div className="flex items-center gap-1 p-2 bg-muted/50 rounded-lg border">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFormat("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFormat("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFormat("list")}
            title="List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFormat("code")}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFormat("link")}
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
          
          <div className="ml-auto text-xs text-muted-foreground">
            Ctrl+Enter to submit
          </div>
        </div>
      )}

      {/* Text Area */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(minHeight, "resize-none")}
      />

      {/* Submit Button */}
      {onSubmit && (
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={!value.trim() || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Posting..." : submitLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
