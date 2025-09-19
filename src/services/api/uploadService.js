// Simulate file upload service with realistic progress tracking
class UploadService {
  async uploadFile(file, progressCallback) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      const baseDelay = Math.random() * 1000 + 500; // 500-1500ms base
      const sizeMultiplier = file.size / (1024 * 1024); // MB
      const totalTime = baseDelay + (sizeMultiplier * 200); // Additional time based on size
      
      let progress = 0;
      const increment = Math.random() * 15 + 5; // 5-20% increments
      
      const updateProgress = () => {
        progress += increment + (Math.random() * 10 - 5); // Add some randomness
        progress = Math.min(progress, 100);
        
        if (progressCallback) {
          progressCallback(Math.round(progress));
        }
        
        if (progress >= 100) {
          // Simulate potential failures (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error(this.getRandomError()));
          } else {
            resolve({
              success: true,
              fileId: this.generateFileId(),
              filename: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date().toISOString(),
              url: `https://example.com/uploads/${this.generateFileId()}-${file.name}`
            });
          }
        } else {
          // Continue updating progress
          const nextUpdate = (totalTime / 100) * increment;
          setTimeout(updateProgress, nextUpdate);
        }
      };
      
      // Start upload simulation
      setTimeout(updateProgress, 100);
    });
  }
  
  async uploadMultipleFiles(files, progressCallback) {
    const results = [];
    let overallProgress = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const result = await this.uploadFile(file, (fileProgress) => {
          // Calculate overall progress
          const completedFiles = i;
          const currentFileProgress = fileProgress / files.length;
          overallProgress = (completedFiles / files.length * 100) + currentFileProgress;
          
          if (progressCallback) {
            progressCallback(Math.round(overallProgress));
          }
        });
        
        results.push({ ...result, originalFile: file });
      } catch (error) {
        results.push({ 
          success: false, 
          error: error.message, 
          originalFile: file 
        });
      }
    }
    
    return results;
  }
  
  generateFileId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  
  getRandomError() {
    const errors = [
      "Network connection lost",
      "File format not supported",
      "Server temporarily unavailable",
      "File size exceeds server limits",
      "Upload timeout occurred",
      "Invalid file content detected"
    ];
    
    return errors[Math.floor(Math.random() * errors.length)];
  }
  
  // Validate file before upload
  validateFile(file, options = {}) {
    const {
      maxSize = 50 * 1024 * 1024, // 50MB default
      allowedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.txt'],
      maxNameLength = 255
    } = options;
    
    const errors = [];
    
    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size (${this.formatFileSize(file.size)}) exceeds maximum allowed size (${this.formatFileSize(maxSize)})`);
    }
    
    // Check file name length
    if (file.name.length > maxNameLength) {
      errors.push(`File name too long (max ${maxNameLength} characters)`);
    }
    
    // Check file type
    const isValidType = allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      } else if (type.includes('*')) {
        const baseType = type.split('/')[0];
        return file.type.startsWith(baseType + '/');
      } else {
        return file.type === type;
      }
    });
    
    if (!isValidType) {
      errors.push(`File type not allowed. Supported types: ${allowedTypes.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  // Get upload statistics
  getUploadStats(files) {
    const totalFiles = files.length;
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const completed = files.filter(f => f.status === 'completed').length;
    const failed = files.filter(f => f.status === 'error').length;
    const pending = files.filter(f => f.status === 'pending').length;
    const uploading = files.filter(f => f.status === 'uploading').length;
    
    return {
      totalFiles,
      totalSize: this.formatFileSize(totalSize),
      completed,
      failed,
      pending,
      uploading,
      completionRate: totalFiles > 0 ? Math.round((completed / totalFiles) * 100) : 0
    };
  }
}

export const uploadService = new UploadService();