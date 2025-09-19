import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg transform hover:scale-105",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200",
    success: "bg-success-500 text-white hover:bg-success-600 shadow-md",
    error: "bg-error-500 text-white hover:bg-error-600 shadow-md",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;