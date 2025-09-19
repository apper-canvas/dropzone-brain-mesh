import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress = 0, 
  variant = "primary",
  size = "default",
  showPercentage = true,
  className = "",
  animated = true
}) => {
  const variants = {
    primary: "bg-primary-500",
    success: "bg-success-500",
    error: "bg-error-500",
    warning: "bg-warning-500",
  };

  const sizes = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3",
  };

  const backgroundColors = {
    primary: "bg-primary-100",
    success: "bg-success-100",
    error: "bg-error-100",
    warning: "bg-warning-100",
  };

  return (
    <div className={cn("w-full", className)}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-900">{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className={cn(
        "w-full rounded-full overflow-hidden",
        sizes[size],
        backgroundColors[variant]
      )}>
        <motion.div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            variants[variant]
          )}
          initial={{ width: 0 }}
          animate={{ 
            width: `${Math.min(Math.max(progress, 0), 100)}%` 
          }}
          transition={animated ? { duration: 0.3, ease: "easeOut" } : { duration: 0 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;