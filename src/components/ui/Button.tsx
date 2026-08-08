import React from "react";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      href,
      target,
      rel,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono font-bold tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97]";

    const variants = {
      primary:
        "bg-white text-black hover:bg-neutral-200 border border-white shadow-md shadow-white/10 hover:shadow-white/20",
      secondary:
        "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600",
      outline:
        "bg-transparent text-white border border-neutral-700/80 hover:border-white hover:bg-white/10 shadow-sm",
      ghost:
        "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/80",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs gap-2 rounded-md font-mono",
      md: "px-5 py-2.5 text-sm gap-2 rounded-lg font-mono",
      lg: "px-7 py-3.5 text-base gap-3 rounded-lg font-mono uppercase tracking-wider",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
