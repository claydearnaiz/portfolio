"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono selection:bg-white selection:text-black">
      <div className="max-w-md w-full p-8 border border-neutral-800 bg-neutral-950/80 rounded-2xl text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            // ERROR DETECTED
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            SOMETHING WENT WRONG
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            An unforeseen runtime anomaly occurred. Try resetting the current view state.
          </p>
        </div>

        <Button
          onClick={() => reset()}
          variant="primary"
          size="md"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="w-full justify-center"
        >
          RETRY SYSTEM
        </Button>
      </div>
    </div>
  );
}
