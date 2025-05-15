import { useRef, useState } from "react";

export default function Home() {
  const fileInputRef = useRef();
  const [previews, setPreviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const openFilePicker = () => fileInputRef.current.click();

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const newPreviews = [];

    fileArray.forEach((file, i) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === fileArray.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
          setShowModal(true);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const removeImage = (indexToRemove) => {
    setPreviews(previews.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      className="h-[calc(100vh-64px)] flex flex-col items-center justify-center space-y-6 px-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p className="text-blue-400 text-center jetbrains-mono-italic my-4">
        Easily classify your waste and find nearby recycling centers
      </p>

      <button
        onClick={openFilePicker}
        className={`bg-gray-900 text-white px-6 py-3 rounded-full border ${
          dragActive ? "border-blue-400" : "border-white"
        } hover:bg-gray-800 transition-all duration-200 font-mono text-sm`}
      >
        Upload Waste Image
      </button>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Modal Preview */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-gray-900 p-6 rounded-lg max-w-3xl w-full shadow-lg border border-white overflow-y-auto max-h-[90vh]">
            <h2 className="text-white text-sm font-mono mb-4 tracking-widest uppercase">
              Image Preview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {previews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-full rounded border border-gray-700"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* ➕ Add More Button */}
            <button
              onClick={openFilePicker}
              className="absolute bottom-4 left-4 bg-white text-black text-sm w-8 h-8 flex items-center justify-center rounded-full font-bold hover:bg-gray-200 transition"
              title="Add more images"
            >
              +
            </button>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPreviews([]);
                }}
                className="px-4 py-2 bg-gray-800 text-white text-xs font-mono rounded-full border border-white hover:bg-gray-700 transition"
              >
                Close
              </button>
              <button
                onClick={() => alert("Submit images to backend")}
                className="px-4 py-2 bg-blue-500 text-white text-xs font-mono rounded-full hover:bg-blue-400 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

