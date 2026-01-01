"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast.error(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Email</CardTitle>
              <CardDescription>Send us an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:support@Adhyayan.com" className="text-primary hover:underline">
                support@Adhyayan.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Available Mon-Fri, 9am-6pm IST
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Phone</CardTitle>
              <CardDescription>Call us during business hours</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="tel:+911234567890" className="text-primary hover:underline">
                +91 123 456 7890
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How quickly will I get a response?</h3>
                <p className="text-muted-foreground">
                  We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What should I include in my message?</h3>
                <p className="text-muted-foreground">
                  Please provide as much detail as possible about your inquiry. Include relevant links, screenshots, or error messages if applicable.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I report content issues here?</h3>
                <p className="text-muted-foreground">
                  Yes! If you find inappropriate or incorrect content, please let us know with the content link and details about the issue.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do you offer technical support?</h3>
                <p className="text-muted-foreground">
                  Absolutely! We're here to help with any technical issues you encounter while using Adhyayan.
                </p>
              </div>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <MapPin className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Office Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Adhyayan Education Platform<br />
                  University Campus<br />
                  City, State - 123456<br />
                  India
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
