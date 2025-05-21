
import { useRef, useState, useEffect } from "react";
import { classifyImage, getFacilities } from "../api"; // Adjust the import path as necessary


function LocationInput({ zip, setZip }) {
  return (
    // <div className="my-4 w-full max-w-md">
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
    try {
      // const { label } = await classifyImage(previews[0]);        // Send to /classify
      const { label } = await classifyImage("https://upload.wikimedia.org/wikipedia/commons/7/78/Plastic_bottles.jpg");
      const results = await getFacilities(label, zip);    // Fetch from /facilities
      setFacilities(results);                                 // Update UI
      console.log("Label returned:", label);
      console.log("Facilities:", results);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4 bg-black text-white ">
      
    <div className={`flex flex-col items-center ${previews.length > 0 ? '-translate-y-4' : ''}`}>
      {/* <p className="text-blue-400 text-center jetbrains-mono-italic px-4 mb-2 ">
        Easily classify your waste and find nearby recycling centers
      </p> */}
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

    {/* <ul>
        {facilities.map((f, i) => (
          <li key={i}>{f.name} — ZIP: {f.zip}</li>
        ))}
    </ul> */}

    {/* 🆕 Add results display */}
    {facilities.length > 0 && (
      <div className="mt-4 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Matching Facilities:</h3>
        <ul className="list-disc list-inside space-y-1">
          {facilities.map((f, i) => (
            <li key={i}>{f.name} — ZIP: {f.zip}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
}
