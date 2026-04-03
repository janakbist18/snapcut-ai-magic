import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "gradient" | "outline" | "ghost";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, size = "md", variant = "gradient", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300",
          "hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          variant === "gradient" &&
            "text-foreground bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 hover:from-fuchsia-500 hover:via-violet-500 hover:to-blue-500 shadow-lg hover:shadow-xl animate-pulse-glow",
          variant === "outline" &&
            "text-foreground gradient-border bg-transparent hover:bg-muted/30",
          variant === "ghost" &&
            "text-muted-foreground hover:text-foreground hover:bg-muted/20",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";
export { GradientButton };
