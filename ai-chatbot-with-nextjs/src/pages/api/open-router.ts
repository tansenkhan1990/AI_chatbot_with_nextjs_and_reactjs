import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTERAPI_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "",
    "X-Title": process.env.SITE_NAME || "",
  },
});

// Next.js API Route must export a default function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" }); // Restrict to POST requests
  }

  try {
    const prompt = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: "What is the meaning of life?",
        },
      ],
    });

    return res
      .status(200)
      .json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


