import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
import users from "./db.json" with { type: "json" };
import { encode } from '@byjohann/toon';

const ai = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const main = async (query = "") => {
    const systemPrompt = `You are an AI expert for chatting and resolving user queries for the given user data. Use the user data to provide accurate and personalized responses.
  
    User Data: ${encode(users)}`;

  console.log("system prompt : ", systemPrompt);

  const response = await ai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ],
  });

  console.log("AI response: ", response.choices[0].message.content);
  console.log("Prompt tokens : ", response.usage.prompt_tokens);
  console.log("Completion tokens : ", response.usage.completion_tokens);
  console.log("Total tokens used : ", response.usage.total_tokens);
};

main("Who is Aditya rao?");
