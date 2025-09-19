import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FileUploadPage from "@/components/pages/FileUploadPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-inter">
        <Routes>
          <Route path="/" element={<FileUploadPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;