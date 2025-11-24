"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

/**
 * Viewport Indicator Component
 * Shows current viewport size and breakpoint during development
 * Only visible in development mode
 */
export function ViewportIndicator() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") {
    return null;
  }

  const getBreakpoint = () => {
    if (viewport.width < 640) return { name: "Mobile", color: "destructive" };
    if (viewport.width < 768) return { name: "SM", color: "default" };
    if (viewport.width < 1024) return { name: "Tablet (MD)", color: "secondary" };
    if (viewport.width < 1280) return { name: "Desktop (LG)", color: "default" };
    return { name: "XL", color: "default" };
  };

  const breakpoint = getBreakpoint();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      <Badge variant={breakpoint.color as any} className="text-xs font-mono">
        {breakpoint.name}
      </Badge>
      <Badge variant="outline" className="text-xs font-mono">
        {viewport.width} × {viewport.height}
      </Badge>
    </div>
  );
}
