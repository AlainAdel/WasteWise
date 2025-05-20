export const classifyImage = async (req, res) => {
    try {
        // This is where you'll call OpenAI Vision later
        const { imageURL } = req.body; // temporary stand-in
        const fakeLabel = "plastic"; // placeholder
        res.json({ label: fakeLabel });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to classify image" });
    }
};
