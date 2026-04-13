"use client";
import { useState } from "react";
export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const inputHadle = async () => {
    const response = await fetch("/api/userOption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setReply(data.reply);
  };
  return (
  <>
    <h1>AI Agent</h1>
    <input type="text" 
      placeholder="input" 
      value={input}
      onChange={(e) => setInput(e.target.value)}/>
    <button onClick={inputHadle}>send</button> 
    <p>{reply}</p>
  </>
  )
}