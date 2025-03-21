### Instructions 
# clone the project 
# go to it's root directory
# npm run install <!-- to install dependencies -->
# npm run dev <!-- to run the project -->
# replace your key to .env file
# Here i am using open router api keys for open ai because its free
# but because of limitation i am getting belows error which is completely normal

{
  error: {
    message: 'More credits are required to run this request. 16384 token capacity required, 4000 available. To increase, visit https://openrouter.ai/settings/credits and upgrade to a paid account',
    code: 402
  }
}


### if you want to use paid openai api key just replace the belows code /pages/api/index.ts 

## Example API Route Code

Here is the Next.js API route that integrates with OpenAI:

```typescript
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
