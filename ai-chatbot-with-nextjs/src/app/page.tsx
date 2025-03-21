"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const startConversation = async () => {
    if (!prompt.trim()) return;
    setIsRunning(true);
    setConversation([]);

    let messages: string[] = [prompt];
    for (let i = 0; i < 10; i++) {
      const response = await fetch("/api/open-router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messages[messages.length - 1] }),
      });
      const data = await response.json();
      messages.push(data.reply);
      setConversation([...messages]);
      if (messages.length >= 10) break;
    }
    setIsRunning(false);
    setPrompt("");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter initial prompt"
        className="border p-2 w-96"
      />
      <button
        onClick={startConversation}
        disabled={!prompt.trim() || isRunning}
        className={`mt-4 p-2 bg-blue-500 text-white ${
          !prompt.trim() ? "opacity-50" : "hover:bg-blue-700"
        }`}
      >
        START
      </button>
      <div className="mt-6 w-96 border p-4">
        {conversation.map((msg, index) => (
          <p
            key={index}
            className={index % 2 === 0 ? "text-blue-600" : "text-green-600"}
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
