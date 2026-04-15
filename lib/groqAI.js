import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
export async function groqAI(input, system) {// parameter is a string
  async function POST(req, temp) {// req is an array
    return await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: temp,// 0-1
      messages: req,
    });
  }
  try {
    if (system) {
      const response = await POST([
        { role: "system", content: system },
        { role: "user", content: input }], 0);
      return JSON.parse(response.choices[0].message.content);
    }
    else {
      const response = await POST([{ role: "user", content: input }], 0.7);
      return response.choices[0].message.content;
    }
  } catch (error) {
    return system ? { reply: error, option: "false", bug: error }: error;
  }
}