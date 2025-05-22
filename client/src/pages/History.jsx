import React, { useEffect, useState } from 'react';
import ResultCard from '../components/ResultCard';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wastewise-history")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 montserrat-regular ">
      <h1 className="text-blue-400 text-2xl mb-6 text-center">
        CLASSIFICATION HISTORY
      </h1>
      <div className="space-y-6 max-w-2xl mx-auto">
        {history.length > 0 ? (
          history.map((res, i) => (
            <ResultCard
              key={i}
              classification={res.classification}
              facilities={res.facilities}
              preview={res.preview}
            />
          ))
        ) : (
          <p className="font-mono text-center text-gray-400">No history yet. Classify something!</p>
        )}
      </div>
        <button
            onClick={() => {
                localStorage.removeItem("wastewise-history");
                setHistory([]);
            }}
            className="font-mono text-sm text-red-400 underline text-center block mx-auto mt-4"
        >
            Clear History
        </button>  
    </div>
  );
};

export default History;
