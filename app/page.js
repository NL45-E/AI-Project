"use client";
import { useState } from "react";
import style from "./style/main.module.css";
export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("");
  async function agent() {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const {reply, option} = await response.json();
    setMessage(reply); setOption(option);
  };
  return (
    <>
      <h1 className={style.title}>AI Agent</h1>
      <div className={style.horizontal}>
        <input
          className={style.input}
          type="text"
          placeholder="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={style.button} onClick={agent}>
          send
        </button>
      </div>
      <p>{message}</p>

      <div>
        {option === "login" && (
          <button 
            onClick={() => alert("login")}
            className={style.button}>try login?</button>
        )}

        {option === "register" && (
          <button 
            className={style.button} 
            onClick={() => alert("register")}>try register?</button>
        )}

        {option === "info" && (
          <p>
            This is a personal website including <i>AI agen</i> created by
            Nabil.R
            <br />
            Source code:{" "}
            <a href="https://github.com/NL45-E/AI-Project">github</a>
            <br />
            this website is <b>under development</b>
          </p>
        )}
      </div>
    </>
  );
}