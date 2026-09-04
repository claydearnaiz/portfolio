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
      "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] rounded-none";

    const variants = {
      primary:
        "bg-accent text-accent-foreground hover:bg-foreground border border-accent hover:border-foreground",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-surface-strong border border-border",
      outline:
        "bg-transparent text-foreground border border-border hover:border-foreground hover:bg-secondary",
      ghost:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
    };

    const sizes = {
      sm: "min-h-[40px] px-3.5 py-1.5 text-xs gap-2",
      md: "min-h-[44px] px-5 py-2.5 text-sm gap-2",
      lg: "min-h-[48px] px-6 py-3 text-base gap-3",
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
