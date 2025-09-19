import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No Files Selected", 
  message = "Drag and drop your files here or click to browse and select files from your device.", 
  onAction,
  actionLabel = "Select Files",
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-100 via-primary-50 to-gray-50 rounded-full flex items-center justify-center mb-6 shadow-lg"
        >
          <ApperIcon name="Upload" className="w-10 h-10 text-primary-500" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-8 leading-relaxed"
        >
          {message}
        </motion.p>
        
        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ApperIcon name="FolderOpen" className="w-5 h-5 mr-2" />
              {actionLabel}
            </Button>
            
            <div className="text-sm text-gray-400">
              Supports images, documents, and more
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;