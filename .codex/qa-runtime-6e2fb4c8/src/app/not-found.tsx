import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono selection:bg-white selection:text-black">
      <div className="max-w-md w-full p-8 border border-neutral-800 bg-neutral-950/80 rounded-2xl text-center space-y-6">
        <div className="text-6xl font-black text-white tracking-tighter">
          404
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            // PAGE NOT FOUND
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-white">
            OUT OF BOUNDS
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The requested location does not exist within this studio architecture.
          </p>
        </div>

        <Button
          href="/"
          variant="primary"
          size="md"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="w-full justify-center"
        >
          RETURN TO MAIN SITE
        </Button>
      </div>
    </div>
  );
}
