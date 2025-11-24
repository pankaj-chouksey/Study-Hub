"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { verifyThemeAccessibility } from "@/lib/theme-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Theme Test Component
 * Displays theme accessibility information and contrast ratios
 * Only for development/testing purposes
 */
export function ThemeTest() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    setResults(verifyThemeAccessibility());
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme || "light";
  const themeResults = results?.[currentTheme === "dark" ? "dark" : "light"];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Theme Accessibility Report</CardTitle>
        <p className="text-sm text-muted-foreground">
          Current theme: <Badge>{currentTheme}</Badge>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {themeResults &&
          Object.entries(themeResults).map(([key, value]: [string, any]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div>
                <p className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Contrast Ratio: {value.ratio}:1
                </p>
              </div>
              <div className="flex gap-2">
                {value.meetsAA ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    WCAG AA
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    WCAG AA
                  </Badge>
                )}
                {value.meetsAAA ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    WCAG AAA
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    WCAG AAA
                  </Badge>
                )}
              </div>
            </div>
          ))}

        <div className="mt-6 p-4 rounded-lg bg-muted">
          <h4 className="font-semibold mb-2">Theme Persistence Test</h4>
          <p className="text-sm text-muted-foreground">
            Theme preference is stored in localStorage as "studyhub-theme" and
            persists across sessions. Try switching themes and refreshing the
            page to verify.
          </p>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-muted">
          <h4 className="font-semibold mb-2">Component Theme Support</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 rounded bg-background text-foreground border">
              Background/Foreground
            </div>
            <div className="p-2 rounded bg-card text-card-foreground border">
              Card
            </div>
            <div className="p-2 rounded bg-primary text-primary-foreground">
              Primary
            </div>
            <div className="p-2 rounded bg-secondary text-secondary-foreground">
              Secondary
            </div>
            <div className="p-2 rounded bg-muted text-muted-foreground">
              Muted
            </div>
            <div className="p-2 rounded bg-accent text-accent-foreground">
              Accent
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
