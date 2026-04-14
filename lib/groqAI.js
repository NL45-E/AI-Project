import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
export async function groqAI(input, system) {// parameter is a string
  console.log(input);
  async function POST(req) {// req is an array
    return await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: req,
    });
  }
  try {
    if (system) {
      const response = await POST([
        { role: "system", content: system },
        { role: "user", content: input }
      ]);
      return JSON.parse(response.choices[0].message.content);
    }
    else {
      const response = await POST([{ role: "user", content: input }]);
      return response.choices[0].message.content;
    }
  } catch (error) {
    return system ? { reply: error, option: "false", bug: error }: error;
  }
}