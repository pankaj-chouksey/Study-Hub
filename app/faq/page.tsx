import { MainLayout } from "@/components/layout/main-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Find answers to common questions about Adhyayan
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Adhyayan?</AccordionTrigger>
            <AccordionContent>
              Adhyayan is a collaborative platform where students can share and access study materials including notes, videos, past year questions, and important questions for various departments and subjects.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to sign up to browse content?</AccordionTrigger>
            <AccordionContent>
              No! You can browse all approved content without creating an account. However, you need to sign up if you want to upload content or post comments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How do I upload content?</AccordionTrigger>
            <AccordionContent>
              First, create an account or sign in. Then go to the Upload page, select your department, branch, semester, subject, and topic. Upload your file or add a YouTube link, and submit for approval.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Why does my content need approval?</AccordionTrigger>
            <AccordionContent>
              All content goes through an approval process to ensure quality, relevance, and appropriateness. This helps maintain a high standard of educational materials for all users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How long does approval take?</AccordionTrigger>
            <AccordionContent>
              Approval typically takes 24-48 hours. You'll be notified once your content is reviewed. Make sure to follow the upload guidelines for faster approval.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>What file formats are supported?</AccordionTrigger>
            <AccordionContent>
              We support PDF, DOC, DOCX, PPT, PPTX, images (JPG, PNG), and videos (MP4). For videos, you can also share YouTube links. Maximum file size is 50 MB.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>How does the points system work?</AccordionTrigger>
            <AccordionContent>
              You earn points for contributing to the platform. Points are awarded for approved uploads, helpful comments, and community engagement. Check the leaderboard to see top contributors.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Can I download content?</AccordionTrigger>
            <AccordionContent>
              Yes! All approved content can be downloaded for offline study. Simply click on the content and use the download button.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>How do I report inappropriate content?</AccordionTrigger>
            <AccordionContent>
              If you find any inappropriate or incorrect content, please contact us through the Contact page or email us directly. We take content quality seriously.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Is Adhyayan free to use?</AccordionTrigger>
            <AccordionContent>
              Yes! Adhyayan is completely free for all students. Our mission is to make quality education accessible to everyone.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </MainLayout>
  )
}
