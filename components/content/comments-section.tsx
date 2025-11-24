"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, MessageCircle, Send, Lock } from "lucide-react"
import { Comment } from "@/lib/types"
import { cn } from "@/lib/utils"
import { isAuthenticated } from "@/lib/auth-utils"

interface CommentsSectionProps {
  contentId: string
  comments: Comment[]
  className?: string
}

interface CommentItemProps {
  comment: Comment
  depth?: number
  onReply: (commentId: string, content: string) => void
}

function CommentItem({ comment, depth = 0, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes)

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted)
    setUpvoteCount(isUpvoted ? upvoteCount - 1 : upvoteCount + 1)
  }

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent("")
      setShowReplyForm(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const maxDepth = 3
  const isMaxDepth = depth >= maxDepth

  // Safety check for author
  if (!comment.author) {
    return null
  }

  return (
    <div className={cn("space-y-3", depth > 0 && "ml-8 mt-3")}>
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="text-sm text-foreground mb-2 whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 text-xs gap-1",
                isUpvoted && "text-primary"
              )}
              onClick={handleUpvote}
            >
              <ThumbsUp className={cn("w-3 h-3", isUpvoted && "fill-current")} />
              {upvoteCount > 0 && upvoteCount}
            </Button>

            {!isMaxDepth && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageCircle className="w-3 h-3" />
                Reply
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                >
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowReplyForm(false)
                    setReplyContent("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
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

export function CommentsSection({
  contentId,
  comments,
  className,
}: CommentsSectionProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [allComments, setAllComments] = useState(comments)

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated())
  }, [])

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        postId: contentId,
        authorId: "current-user",
        author: {
          id: "current-user",
          name: "Current User",
          email: "user@example.com",
          role: "student",
          branch: "Computer Science",
          year: "Third Year",
          points: 0,
          createdAt: new Date(),
        },
        content: newComment,
        upvotes: 0,
        replies: [],
        createdAt: new Date(),
      }

      setAllComments([comment, ...allComments])
      setNewComment("")
    }
  }

  const handleReply = (commentId: string, content: string) => {
    // In a real app, this would make an API call
    const reply: Comment = {
      id: `reply-${Date.now()}`,
      postId: contentId,
      authorId: "current-user",
      author: {
        id: "current-user",
        name: "Current User",
        email: "user@example.com",
        role: "student",
        branch: "Computer Science",
        year: "Third Year",
        points: 0,
        createdAt: new Date(),
      },
      content,
      upvotes: 0,
      replies: [],
      createdAt: new Date(),
      parentId: commentId,
    }

    // Add reply to the appropriate comment
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          }
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          }
        }
        return comment
      })
    }

    setAllComments(addReplyToComment(allComments))
  }

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-xl font-semibold mb-6">
        Comments ({allComments.length})
      </h3>

      {/* New Comment Form */}
      {isUserAuthenticated ? (
        <div className="mb-8 space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="mb-8 p-6 border-2 border-dashed rounded-lg text-center bg-muted/30">
          <Lock className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <h4 className="font-semibold mb-2">Sign in to comment</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Join the discussion by creating an account or signing in
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild size="sm">
              <Link href={`/login?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`}>
                Sign in
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/signup?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`}>
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      )}

      <Separator className="mb-6" />

      {/* Comments List */}
      {allComments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {allComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
