"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
        <div className="max-w-md w-full p-8 border border-neutral-800 bg-neutral-950 rounded-2xl text-center space-y-6">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
            // CRITICAL SYSTEM ERROR
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            GLOBAL APPLICATION FAILURE
          </h1>
          <p className="text-xs text-neutral-400">
            A unhandled global exception occurred. Click reset to reload system state.
          </p>
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="w-full justify-center"
          >
            RELOAD APPLICATION
          </Button>
        </div>
      </body>
    </html>
  );
}
