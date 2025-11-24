"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowBigUp, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CommentThread } from "@/components/discussion/comment-thread"
import { TextEditor } from "@/components/discussion/text-editor"
import { useDiscussionPost, useCommentForm } from "@/hooks/use-discussion"
import { toast } from "sonner"

export default function DiscussionThreadPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  
  const { post, loading, error } = useDiscussionPost(postId)
  const { content, setContent, isSubmitting, submit, reset } = useCommentForm()
  const [replyingTo, setReplyingTo] = useState<string | undefined>()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const handleUpvote = () => {
    console.log("Upvoting post:", postId)
    toast.success("Post upvoted!")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleBookmark = () => {
    console.log("Bookmarking post:", postId)
    toast.success("Post bookmarked!")
  }

  const handleSubmitComment = async () => {
    const success = await submit(postId, replyingTo)
    if (success) {
      toast.success("Comment posted successfully!")
      reset()
      setReplyingTo(undefined)
    } else {
      toast.error("Failed to post comment")
    }
  }

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId)
    // Scroll to comment form
    document.getElementById("comment-form")?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="p-8 h-96 animate-pulse bg-muted" />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The discussion post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/discussion")}>
            Back to Discussions
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => router.push("/discussion")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </Button>

        {/* Post Content */}
        <Card className="p-8 mb-8">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.branch} · {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">{post.title}</h1>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-6 whitespace-pre-wrap">
            {post.content}
          </div>

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleUpvote}
            >
              <ArrowBigUp className="w-5 h-5" />
              <span className="font-semibold">{post.upvotes}</span>
              <span className="hidden sm:inline">Upvote</span>
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={handleBookmark}
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Save</span>
            </Button>

            <div className="ml-auto text-sm text-muted-foreground">
              {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Replies ({post.replies.length})
          </h2>

          {/* Comment Form */}
          <Card className="p-6" id="comment-form">
            <h3 className="font-semibold mb-4">
              {replyingTo ? "Write a reply" : "Add a comment"}
            </h3>
            {replyingTo && (
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary">Replying to comment</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(undefined)}
                >
                  Cancel
                </Button>
              </div>
            )}
            <TextEditor
              value={content}
              onChange={setContent}
              onSubmit={handleSubmitComment}
              isSubmitting={isSubmitting}
              submitLabel="Post Comment"
              placeholder="Share your thoughts..."
            />
          </Card>

          {/* Comments Thread */}
          <CommentThread
            comments={post.replies}
            onReply={handleReply}
          />
        </div>
      </div>
    </div>
  )
}
