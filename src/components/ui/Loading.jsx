import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-6 ${className}`}>
      {/* Upload Zone Skeleton */}
      <div className="w-full">
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 shimmer"></div>
      </div>

      {/* File List Skeleton */}
      <div className="space-y-3">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 shimmer"></div>
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shimmer"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2 shimmer"></div>
            </div>
            <div className="w-20 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded shimmer"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;