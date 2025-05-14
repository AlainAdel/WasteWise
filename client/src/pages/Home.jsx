export default function Home() {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center w-full">
        <p className="text-blue-400 text-center jetbrains-mono-italic px-4 my-4">
          Easily classify your waste and find nearby recycling centers
        </p>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-full border border-white hover:bg-gray-800 transition-all duration-200 font-mono text-sm">
          Upload Waste Image
        </button>
      </div>
    );
  }
  