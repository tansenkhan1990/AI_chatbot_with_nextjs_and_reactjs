import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use OpenAI API key
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const prompt = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Valid prompt is required" });
    }

    console.log("🔹 Sending request to OpenAI with prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // OpenAI's latest model
      messages: [{ role: "user", content: prompt }],
    });

    if (!completion.choices || completion.choices.length === 0) {
      return res.status(500).json({ error: "No response generated" });
    }

    return res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("❌ OpenAI API Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message || "Unknown error",
    });
  }
}