// POST /classify
export const classifyImage = async (imageUrl) => {
  const res = await fetch('wastewise-server.up.railway.app/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });
  if (!res.ok) throw new Error('Classification failed');

  return res.json();
};

export const getFacilities = async (type, zip) => {
  const res = await fetch(`/api/facilities?type=${type}`);
  if (!res.ok) throw new Error('Failed to fetch facilities');
  return res.json();
};
