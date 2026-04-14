import { groqAI } from "../../../lib/groqAI.js";
import { prompt } from "../../../lib/prompt.js";
export async function POST(req) {
    const question = "Having problem with our website?";
    const { input } = await req.json();
    if (!input) {
        return Response.json({
            reply:"input is required.",
            option:"false"
        });
    }
    // call groqAI to classify the input and generate a reply
    const res = await groqAI(
      prompt(question, input),
      "You are a strict classifier in personal website. Return ONLY JSON.",
    );
    const { reply, option, bug } = JSON.parse(res);
    return Response.json({ reply, option });
}