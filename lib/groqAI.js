import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
export async function groqAI(input, system) {// prompt is a string
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    messages: [
      { role: "user", content: input },
      { role: "system", content: system },
    ],
  });
  return response.choices[0].message.content;
}