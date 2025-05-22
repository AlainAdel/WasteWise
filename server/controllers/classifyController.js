import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const classifyImage = async (req, res) => {
  const { imageUrl } = req.body;

  console.log("Incoming imageUrl:", imageUrl);
  console.log("OpenAI key loaded?", !!process.env.OPENAI_API_KEY);

  if (!imageUrl) return res.status(400).json({ error: "Missing imageUrl" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What type of waste is in this image? Classify it as plastic, paper, metal, glass, textile, shoes, e-waste, organic, mix, or other. Give the response as only one word." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 100,
    });


    const label = response.choices[0]?.message?.content?.toLowerCase().trim();
    console.log("Label returned from OpenAI:", label);
    res.json({ label });
    }

    catch (error) {
    console.error("OpenAI error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: "Failed to classify image with OpenAI" });
    }
    
}
