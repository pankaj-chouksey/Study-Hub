import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Target, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">About Adhyayan</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A collaborative platform for students to share and access study materials
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To make quality education accessible to all students by creating a platform where they can freely share and access study materials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built by students, for students. Every contribution helps the entire community learn and grow together.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">📝 Study Notes</h3>
              <p className="text-muted-foreground">Comprehensive notes for all subjects and topics</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎥 Video Lectures</h3>
              <p className="text-muted-foreground">Curated video content to help you understand concepts better</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📋 Past Year Questions</h3>
              <p className="text-muted-foreground">Previous exam papers to help you prepare</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⭐ Important Questions</h3>
              <p className="text-muted-foreground">Curated list of important questions for exam preparation</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Built by Pankaj Chouksey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Created with passion to help students access quality study materials and collaborate with their peers. 
              This platform aims to make education more accessible and collaborative for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
