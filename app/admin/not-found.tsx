import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldAlert, Home } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-md p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <ShieldAlert className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-light">Admin Page Not Found</h2>
          <p className="text-muted-foreground">
            The admin page you're looking for doesn't exist.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/admin">
              Go to Admin Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
