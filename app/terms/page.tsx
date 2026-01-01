import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Shield, Users, Ban } from "lucide-react"

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing or using Adhyayan, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Creation</h3>
                <p className="text-muted-foreground">
                  To use certain features of Adhyayan, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You agree to use Adhyayan only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Upload any content that is illegal, harmful, threatening, abusive, or violates any laws</li>
                <li>Upload copyrighted material without proper authorization</li>
                <li>Upload content that contains viruses, malware, or other harmful code</li>
                <li>Impersonate any person or entity or falsely state your affiliation</li>
                <li>Interfere with or disrupt the platform or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the platform</li>
                <li>Use automated systems to scrape or collect data from the platform</li>
                <li>Upload spam, duplicate content, or content that is not educational</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Content Ownership and Licensing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-muted-foreground">
                  You retain ownership of any content you upload to Adhyayan. By uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content on the platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Moderation</h3>
                <p className="text-muted-foreground">
                  All uploaded content is subject to review and approval by administrators. We reserve the right to reject, remove, or modify any content that violates these Terms or our community guidelines.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Copyright</h3>
                <p className="text-muted-foreground">
                  You represent and warrant that you own or have the necessary rights to upload and share the content you submit. You are solely responsible for ensuring your content does not infringe on the rights of others.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Adhyayan platform, including its design, features, and functionality, is owned by us and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or create derivative works of the platform without our express written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We strive to keep Adhyayan available 24/7, but we do not guarantee uninterrupted access. The platform may be unavailable due to maintenance, updates, or circumstances beyond our control. We are not liable for any loss or damage resulting from platform unavailability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Adhyayan is provided "as is" and "as available" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any content on the platform. You use the platform at your own risk.
              </p>
              <p className="text-muted-foreground">
                We are not responsible for the quality, accuracy, or legality of user-uploaded content. Users are responsible for verifying the accuracy and appropriateness of content before using it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, Adhyayan and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-primary" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account and access to the platform at any time, with or without cause or notice, for any reason, including violation of these Terms.
              </p>
              <p className="text-muted-foreground">
                You may terminate your account at any time by contacting us or using the account deletion feature (if available).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the platform after such changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:support@adhyayan.com" className="text-primary hover:underline">support@adhyayan.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

