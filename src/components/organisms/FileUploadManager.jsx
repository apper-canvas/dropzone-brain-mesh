import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { uploadService } from "@/services/api/uploadService";
import ApperIcon from "@/components/ApperIcon";
import UploadZone from "@/components/molecules/UploadZone";
import FilePreview from "@/components/molecules/FilePreview";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";

const FileUploadManager = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const generateFileId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const createFilePreview = (file) => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
  };

  const handleFileSelect = useCallback(async (selectedFiles) => {
    const newFiles = await Promise.all(
      selectedFiles.map(async (file) => {
        const preview = await createFilePreview(file);
        return {
          id: generateFileId(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "pending",
          progress: 0,
          error: null,
          preview,
uploadedAt: null,
          description: null,
          file, // Keep reference to original file
        };
      })
    );

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} file${newFiles.length > 1 ? "s" : ""} added to upload queue`);
  }, []);

  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast.info("File removed from queue");
  }, []);

  const handleUploadAll = async () => {
    const pendingFiles = files.filter(file => file.status === "pending");
    if (pendingFiles.length === 0) {
      toast.warning("No files to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let completedCount = 0;
      const totalFiles = pendingFiles.length;

      for (const file of pendingFiles) {
        // Update file status to uploading
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: "uploading", progress: 0 }
            : f
        ));

        try {
          // Simulate upload progress
          const uploadResult = await uploadService.uploadFile(file.file, (progress) => {
            setFiles(prev => prev.map(f => 
              f.id === file.id 
                ? { ...f, progress }
                : f
            ));
          });

// Mark as completed
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  status: "completed", 
                  progress: 100,
                  uploadedAt: new Date(),
                  description: uploadResult.description,
                  error: null
                }
              : f
          ));

          completedCount++;
          toast.success(`${file.name} uploaded successfully`);
          
        } catch (error) {
          // Mark as error
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  status: "error", 
                  error: error.message || "Upload failed",
                  progress: 0
                }
              : f
          ));

          toast.error(`Failed to upload ${file.name}: ${error.message}`);
        }

        // Update overall progress
        const overallProgress = ((completedCount + 1) / totalFiles) * 100;
        setUploadProgress(overallProgress);
      }

      if (completedCount === totalFiles) {
        toast.success(`All ${totalFiles} files uploaded successfully!`);
      } else {
        toast.warning(`${completedCount} of ${totalFiles} files uploaded successfully`);
      }

    } catch (error) {
      toast.error("Upload process failed");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRetryFailed = async () => {
    const failedFiles = files.filter(file => file.status === "error");
    if (failedFiles.length === 0) {
      toast.info("No failed uploads to retry");
      return;
    }

    // Reset failed files to pending
    setFiles(prev => prev.map(file => 
      file.status === "error" 
        ? { ...file, status: "pending", error: null, progress: 0 }
        : file
    ));

    toast.info(`${failedFiles.length} failed upload${failedFiles.length > 1 ? "s" : ""} reset to pending`);
  };

  const handleClearCompleted = () => {
    const completedFiles = files.filter(file => file.status === "completed");
    if (completedFiles.length === 0) {
      toast.info("No completed uploads to clear");
      return;
    }

    setFiles(prev => prev.filter(file => file.status !== "completed"));
    toast.success(`${completedFiles.length} completed upload${completedFiles.length > 1 ? "s" : ""} cleared`);
  };

  const pendingCount = files.filter(f => f.status === "pending").length;
  const uploadingCount = files.filter(f => f.status === "uploading").length;
  const completedCount = files.filter(f => f.status === "completed").length;
  const errorCount = files.filter(f => f.status === "error").length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Zone */}
      <UploadZone
        onFileSelect={handleFileSelect}
        acceptedTypes="image/*,application/pdf,.doc,.docx,.txt"
        maxFileSize={50 * 1024 * 1024} // 50MB
        multiple={true}
        disabled={isUploading}
      />

      {/* Upload Controls */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
        >
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600">{pendingCount} Pending</span>
            </div>
            {uploadingCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-primary-600">{uploadingCount} Uploading</span>
              </div>
            )}
            {completedCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="text-success-600">{completedCount} Completed</span>
              </div>
            )}
            {errorCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                <span className="text-error-600">{errorCount} Failed</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {errorCount > 0 && (
              <Button
                onClick={handleRetryFailed}
                variant="outline"
                size="sm"
                disabled={isUploading}
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                Retry Failed
              </Button>
            )}
            
            {completedCount > 0 && (
              <Button
                onClick={handleClearCompleted}
                variant="secondary"
                size="sm"
                disabled={isUploading}
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Clear Completed
              </Button>
            )}

            <Button
              onClick={handleUploadAll}
              disabled={isUploading || pendingCount === 0}
              variant="primary"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              {isUploading ? (
                <>
                  <ApperIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
                  Upload {pendingCount > 0 ? `${pendingCount} ` : ""}Files
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Overall Progress */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <ProgressBar 
                progress={uploadProgress}
                variant="primary"
                size="lg"
                showPercentage={true}
                animated={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ApperIcon name="Files" className="w-5 h-5" />
              Upload Queue ({files.length})
            </h3>
            
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {files.map((file) => (
                  <FilePreview
                    key={file.id}
                    file={file}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadManager;