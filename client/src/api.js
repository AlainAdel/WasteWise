// POST /classify
export const classifyImage = async (imageUrl) => {
  const res = await fetch('http://localhost:3000/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });
  return await res.json();
};

// GET /facilities
// export const getFacilities = async (type, zip) => {
//   const res = await fetch(`http://localhost:3000/facilities?type=${type}&zip=${zip}`);
//   return await res.json();
// };

export const getFacilities = async (type, zip) => {
  const res = await fetch(`/api/facilities?type=${type}`);
  if (!res.ok) throw new Error('Failed to fetch facilities');
  return res.json();
};
