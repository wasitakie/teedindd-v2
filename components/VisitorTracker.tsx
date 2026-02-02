"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const path = window.location.pathname;
        const referer = document.referrer;
        const userAgent = navigator.userAgent;

        await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path,
            referer,
            userAgent,
          }),
        });
      } catch (error) {
        // Silently fail - visitor tracking shouldn't break the app
        console.error("Failed to track visitor:", error);
      }
    };

    trackVisit();
  }, []);

  return null; // This component doesn't render anything
}
