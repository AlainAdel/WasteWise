
import { useRef, useState, useEffect } from "react";
import { classifyImage, getFacilities } from "../api";
import ResultCard from '../components/ResultCard';



function LocationInput({ zip, setZip }) {
  return (
    <div className="my-4 max-w-md items-center">
      <label className="block text-white font-mono text-sm mb-1 text-center">Location</label>
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="Enter ZIP code"
        maxLength="5"
        className="w-full px-4 py-2 text-center font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
      />
    </div>
  );
}

function AutoDetectZip({ setZip }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
              if (data.postcode) {
                setZip(data.postcode);
              }
            });
        },
        (err) => console.log("Geolocation denied", err)
      );
    }
  }, []);

  return null;
}

export default function Home() {
  const fileInputRef = useRef();
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [zip, setZip] = useState("");
  const openFilePicker = () => fileInputRef.current.click();
  const [facilities, setFacilities] = useState([]);
  const resultRef = useRef(null);
  const [classification, setClassification] = useState(null);
  const [results, setResults] = useState([]); // replaces single classification + facilities




  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const newPreviews = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === fileArray.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = async () => {
    const allResults = [];

    try {
      for (const preview of previews) {
        // 🔍 Step 1: classify the image
        const { label } = await classifyImage(preview);

        // 🔍 Step 2: get matching facilities
        const facilities = await getFacilities(label, zip);

        // ✅ Step 3: store result
        allResults.push({
          classification: label,
          facilities,
          preview,
        });
      }

      setResults(allResults);

      // Append to history in localStorage
      const existing = JSON.parse(localStorage.getItem("wastewise-history")) || [];
      localStorage.setItem("wastewise-history", JSON.stringify([...existing, ...allResults]));
      

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("Error during multi-image classification:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4 bg-black text-white ">
      
    <div className={`flex flex-col items-center ${previews.length > 0 ? '-translate-y-4' : ''}`}>
      <h1 className="text-blue-400 text-center text-2xl font-bold montserrat-bold-italic tracking-widest px-4 mb-2 ">
        EASILY CLASSIFY YOUR WASTE AND FIND NEARBY RECYCLING CENTERS
      </h1>
      <div
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-2 bg-[#0d1117] text-white font-mono text-sm px-6 py-3 rounded-full hover:bg-[#161b22] cursor-pointer text-center"
      >
        Upload Waste Image
      </div>
    </div>


    <div className="w-full max-w-sm flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      

      <div className="flex flex-wrap w-full gap-4 mt-4 justify-center">
        {previews.map((src, idx) => (
          <div key={idx} className="relative w-32 h-32">
            <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover rounded-md" />
            <button
              onClick={() => setPreviews(previews.filter((_, i) => i !== idx))}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
            >×</button>
          </div>
        ))}
      </div>

      <LocationInput zip={zip} setZip={setZip} />
      <AutoDetectZip setZip={setZip} />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-mono text-sm"
      >
        Submit
      </button>
    </div>

    {results.length > 0 && (
      <div ref={resultRef} className="mt-6 w-full max-w-2xl space-y-6">
        {results.map((res, i) => (
          <ResultCard
            key={i}
            classification={res.classification}
            facilities={res.facilities}
            preview={res.preview}
          />
        ))}
      </div>
    )}

  </div>
  );
}
// 