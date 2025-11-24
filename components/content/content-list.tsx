import { Content } from "@/lib/types"
import { ContentCard } from "./content-card"
import { FileX } from "lucide-react"

interface ContentListProps {
  content: Content[]
  emptyMessage?: string
  className?: string
}

export function ContentList({ 
  content, 
  emptyMessage = "No content available yet.",
  className 
}: ContentListProps) {
  if (content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <FileX className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Content Found</h3>
        <p className="text-muted-foreground max-w-md">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  )
}
