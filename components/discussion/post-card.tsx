import Link from "next/link"
import { ArrowBigUp, MessageSquare, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiscussionPost } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: DiscussionPost
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`
    return `${Math.floor(diffInDays / 365)}y ago`
  }

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    // In production, this would make an API call to upvote the post
    console.log("Upvoting post:", post.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    // In production, this would open a share dialog
    console.log("Sharing post:", post.id)
  }

  return (
    <Link href={`/discussion/${post.id}`}>
      <Card className={cn(
        "p-6 space-y-4 transition-all duration-200 hover:shadow-lg cursor-pointer",
        className
      )}>
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {post.author.branch} · {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold leading-tight">
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="text-muted-foreground line-clamp-3">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleUpvote}
          >
            <ArrowBigUp className="w-4 h-4" />
            <span className="font-medium">{post.upvotes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <div>
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">{post.replies.length}</span>
            </div>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground ml-auto"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share</span>
          </Button>
        </div>
      </Card>
    </Link>
  )
}
