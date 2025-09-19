import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import FileUploadManager from "@/components/organisms/FileUploadManager";
import Empty from "@/components/ui/Empty";

const FileUploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <ApperIcon name="Upload" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  DropZone
                </h1>
                <p className="text-sm text-gray-500">File Upload Manager</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Shield" className="w-4 h-4" />
                  <span>Secure Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Zap" className="w-4 h-4" />
                  <span>Fast Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-3">
                  <ApperIcon name="MousePointer" className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-primary-900">Drag & Drop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-700 text-sm">
                  Simply drag your files into the upload zone for instant processing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mb-3">
                  <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-success-900">Real-time Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-success-700 text-sm">
                  Track upload progress with detailed status indicators and progress bars.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mb-3">
                  <ApperIcon name="Files" className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900">Multiple Files</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  Upload multiple files at once with batch processing capabilities.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Manager */}
          <Card className="shadow-lg border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ApperIcon name="CloudUpload" className="w-6 h-6 text-primary-500" />
                Upload Files
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Select or drag files to upload. Supports images, documents, and more up to 50MB each.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <FileUploadManager />
            </CardContent>
          </Card>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ApperIcon name="HelpCircle" className="w-5 h-5 text-gray-600" />
                  How to Use DropZone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Select Files</h4>
                      <p className="text-sm text-gray-600">Drag & drop or click to browse files</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Review Queue</h4>
                      <p className="text-sm text-gray-600">Preview files and remove unwanted items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Start Upload</h4>
                      <p className="text-sm text-gray-600">Click upload and monitor progress</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-success-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Complete</h4>
                      <p className="text-sm text-gray-600">Files uploaded successfully with confirmation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-gray-200 bg-gray-50 mt-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Built with React + Vite • Secure file upload with progress tracking
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span>Max file size: 50MB</span>
              <span>•</span>
              <span>Supported: Images, PDFs, Documents</span>
              <span>•</span>
              <span>Multiple file upload</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default FileUploadPage;