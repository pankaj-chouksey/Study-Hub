"use client"

import { useState } from "react"
import { ArrowBigUp, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Comment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CommentThreadProps {
  comments: Comment[]
  className?: string
  onReply?: (commentId: string) => void
}

interface CommentItemProps {
  comment: Comment
  depth?: number
  onReply?: (commentId: string) => void
}

function CommentItem({ comment, depth = 0, onReply }: CommentItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const hasReplies = comment.replies && comment.replies.length > 0

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
    return date.toLocaleDateString()
  }

  const handleUpvote = () => {
    console.log("Upvoting comment:", comment.id)
  }

  const handleReply = () => {
    onReply?.(comment.id)
  }

  return (
    <div className={cn("space-y-3", depth > 0 && "ml-8 pl-4 border-l-2 border-muted")}>
      {/* Comment Header and Content */}
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Author and Date */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          {/* Comment Content */}
          {!isCollapsed && (
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleUpvote}
              >
                <ArrowBigUp className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{comment.upvotes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleReply}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Reply</span>
              </Button>

              {hasReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsCollapsed(true)}
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Collapse</span>
                </Button>
              )}
            </div>
          )}

          {/* Collapsed State */}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setIsCollapsed(false)}
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span className="text-xs">
                Show {hasReplies ? `${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}` : 'comment'}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {!isCollapsed && hasReplies && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentThread({ comments, className, onReply }: CommentThreadProps) {
  if (comments.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  )
}
