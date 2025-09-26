import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FilePreview = ({ 
  file, 
  onRemove,
  className = "" 
}) => {
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "Image";
    if (type.includes("pdf")) return "FileText";
    if (type.includes("document") || type.includes("word")) return "FileText";
    if (type.includes("sheet") || type.includes("excel")) return "FileSpreadsheet";
    if (type.includes("presentation") || type.includes("powerpoint")) return "FilePresentation";
    if (type.includes("video")) return "Video";
    if (type.includes("audio")) return "Music";
    if (type.includes("zip") || type.includes("rar")) return "Archive";
    return "File";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "uploading": return "text-primary-500 bg-primary-100";
      case "completed": return "text-success-500 bg-success-100";
      case "error": return "text-error-500 bg-error-100";
      default: return "text-gray-500 bg-gray-100";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {/* File Icon/Preview */}
      <div className="flex-shrink-0">
        {file.preview && file.type.startsWith("image/") ? (
          <img
            src={file.preview}
            alt={file.name}
            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <ApperIcon name={getFileIcon(file.type)} className="w-6 h-6 text-gray-600" />
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
{formatFileSize(file.size)}
            </p>
            {file.description && (
              <p className="text-xs text-gray-500 mt-1 italic">
                "{file.description}"
              </p>
            )}
          </div>
          
          {/* Status Badge */}
          <div className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            getStatusColor(file.status)
          )}>
            {file.status === "uploading" && <ApperIcon name="Loader" className="w-3 h-3 mr-1 animate-spin" />}
            {file.status === "completed" && <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />}
            {file.status === "error" && <ApperIcon name="XCircle" className="w-3 h-3 mr-1" />}
            {file.status === "pending" && <ApperIcon name="Clock" className="w-3 h-3 mr-1" />}
            {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
          </div>
        </div>

        {/* Progress Bar */}
        {file.status === "uploading" && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Uploading...</span>
              <span className="text-xs font-medium text-gray-700">{file.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <motion.div
                className="bg-primary-500 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${file.progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {file.error && (
          <div className="mt-2 p-2 bg-error-50 border border-error-200 rounded text-xs text-error-700">
            {file.error}
          </div>
        )}
      </div>

      {/* Remove Button */}
      {(file.status === "pending" || file.status === "error") && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(file.id)}
          className="text-gray-400 hover:text-error-500"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </Button>
      )}
    </motion.div>
  );
};

export default FilePreview;