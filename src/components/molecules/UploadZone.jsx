import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const UploadZone = ({ 
  onFileSelect, 
  acceptedTypes = "*",
  maxFileSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  disabled = false,
  className = "" 
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    validateAndProcessFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    validateAndProcessFiles(files);
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const validateAndProcessFiles = (files) => {
    const validFiles = [];
    const errors = [];

    files.forEach((file) => {
      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File size exceeds ${formatFileSize(maxFileSize)}`);
        return;
      }

      // Check file type if specified
      if (acceptedTypes !== "*") {
        const acceptedArray = acceptedTypes.split(",").map(type => type.trim());
        const isValidType = acceptedArray.some(type => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.includes(type);
        });

        if (!isValidType) {
          errors.push(`${file.name}: File type not allowed`);
          return;
        }
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }

    // Handle errors if any
    if (errors.length > 0) {
      console.error("File validation errors:", errors);
      // You could also show these errors in a toast or alert
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className={cn(
        "relative w-full transition-all duration-200 ease-out",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <motion.div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
          isDragOver && !disabled
            ? "border-primary-400 bg-primary-50 scale-105"
            : "border-gray-300 hover:border-primary-300 hover:bg-gray-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        animate={{
          scale: isDragOver && !disabled ? 1.02 : 1,
          borderColor: isDragOver && !disabled ? "#60a5fa" : "#d1d5db",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <AnimatePresence mode="wait">
          {isDragOver && !disabled ? (
            <motion.div
              key="drag-over"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <ApperIcon name="Download" className="w-8 h-8 text-primary-600 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-700 mb-2">
                  Drop your files here
                </h3>
                <p className="text-primary-600">
                  Release to upload your files
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <ApperIcon name="Upload" className="w-8 h-8 text-gray-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload your files
                </h3>
                <p className="text-gray-500">
                  Drag and drop files here, or{" "}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    disabled={disabled}
                    className="text-primary-500 hover:text-primary-600 font-medium underline focus:outline-none"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-gray-400">
                  Maximum file size: {formatFileSize(maxFileSize)}
                  {acceptedTypes !== "*" && (
                    <span className="block">Accepted formats: {acceptedTypes}</span>
                  )}
                </p>
              </div>
              
              <Button
                onClick={handleBrowseClick}
                disabled={disabled}
                variant="primary"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
              >
                <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
                Select Files
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UploadZone;