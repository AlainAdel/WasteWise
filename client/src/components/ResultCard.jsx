import React from 'react';

const ResultCard = ({ classification, facilities, preview }) => {
  return (
    <div className="font-mono bg-gray-800 text-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto space-y-4">
      {preview && (
        <img
          src={preview}
          alt="Waste Preview"
          className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-700"
        />
      )}
            
      <h2 className="text-xl font-semibold text-blue-400">
        Waste Classification: <span className="text-white">{classification}</span>
      </h2>

      {facilities.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-green-300">Matching Facilities</h3>
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-gray-700 p-4 rounded-xl border border-gray-600"
            >
              <p className="font-semibold">{facility.name}</p>
              <p className="text-sm text-gray-300">{facility.address}</p>
              {facility.website && (
                <a
                  href={facility.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline text-sm"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-yellow-300">No matching facilities found.</p>
      )}
    </div>
  );
};

export default ResultCard;
