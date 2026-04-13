import { groqAI } from "../../../lib/groqAI.js";
import { prompt } from "../../../lib/prompt.js";
export async function POST(req) {
    const question = "Having problem with our website?";
    const { input } = await req.json();
    const reply = await groqAI(
      prompt(question, input),
      "You are a strict classifier. Return ONLY JSON.",
    );
    return Response.json({ reply });
}