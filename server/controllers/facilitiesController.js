export const getFacilities = async (req, res) => {
    const { type, zip } = req.query;
    try {
        // Replace this with real DB query later
        const dummyData = [
            { name: 'GreenRecyle Center', zip: '10001', acceptedTypes: ['plastic', 'metal'] },
        ];

        // Filter facilities based on query parameters
        const matches = dummyData.filter(facility => 
            facility.zip === zip && facility.acceptedTypes.includes(type)
        );
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch facilities' });
    }
}