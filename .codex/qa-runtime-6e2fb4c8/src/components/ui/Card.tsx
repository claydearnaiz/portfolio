import React from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  interactive = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-neutral-950/90 backdrop-blur-xl border border-neutral-800/80 rounded-xl p-6 transition-all duration-300 relative overflow-hidden group shadow-lg",
        hoverEffect &&
          "hover:border-neutral-400/90 hover:shadow-2xl hover:shadow-white/[0.04] hover:-translate-y-1",
        interactive && "cursor-pointer active:translate-y-0",
        className
      )}
      {...props}
    >
      {/* Subtle top inner border highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
      {children}
    </div>
  );
};
