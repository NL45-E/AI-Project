import { groqAI } from "@/lib/groqAI.js";
import { prompt } from "@/lib/prompt.js";
import { telegram } from "@/lib/telegram.js";
export async function POST(req) {
    let systemPrompt =
      "You are a strict classifier in personal website. Return ONLY JSON."; 
    let question = "Having problem with our website?";
    const { input } = await req.json();
    function classify(inputText, include) {// iclude is array of words
      const text = inputText.toLowerCase();
      return include.every((word) => text.includes(word));
    };
    if (input[0] === "/") {
      systemPrompt = "";
      question = "";
      const reply = await groqAI(input);
      return Response.json({
        reply: reply,
        option: "false",
        bug: ""
      });
    }
    else if (!input) {
      return Response.json({
          reply:"input is required.",
          option:"false"
      });
    }
    // manual classification
    else if (classify(input, ["cara", "login"]) 
      || classify(input, ["cara", "masuk"]) 
      || classify(input, ["how", "login"])) {
      return Response.json({ 
        reply: "are you already try to login?", option: "login" 
      });
    }
    else if (classify(input, ["cara", "daftar"]) 
      || classify(input, ["cara", "regis"]) 
      || classify(input, ["how", "regis"])) {
      return Response.json({ 
        reply: "you can register here", option: "register" 
      });
    }
    else if (classify(input, ["tentang", "web"]) 
      || classify(input, ["about", "web"])
      || classify(input, ["siapa", "web"])) {
      return Response.json({ 
        reply: "this is information about us", option: "info" 
      });
    }
    // call groqAI to classify the input and generate a reply
    else {
      const { reply, option, bug } = await groqAI(
        prompt(question, input),
        systemPrompt,
      );
      console.log("checkpoint one (1):  " + reply);
      if (bug) {
        await telegram("bug: " + bug);
        return Response.json({
          reply: `Bug sended. ${reply}`,
          option: option,
        });
      }
      return Response.json({ reply, option });
    }
}