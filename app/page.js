"use client";
import { useState } from "react";
import style from "./style/main.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("");
  const [showInput, setShowInput] = useState(false); // New state for visibility

  async function agent() {
    if (!input) {
      setShowInput(false);
      return;
    }
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const { reply, option } = await response.json();
    setMessage(reply);
    setOption(option);
    setInput("");
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>

      <div className={style.content}>
        <div>
          {option === "login" && (
            <button onClick={() => alert("login")} className={style.button}>
              try login?
            </button>
          )}
          {option === "register" && (
            <button className={style.button} onClick={() => alert("register")}>
              try register?
            </button>
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
      </div>

      {/* Chat bar at the bottom */}

      <div className={style.bar}>
        <p className={showInput && message ? style.message : ""}>
          {showInput ? message : ""}
        </p>
        <div className={style.chatBar}>
          {showInput && (
            <input
              className={style.input}
              type="text"
              placeholder="What can I help?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agent()}
            />
          )}
          <button
            className={showInput ? style.sendButton : style.AIbutton}
            onClick={showInput ? agent : () => setShowInput(true)}
          >
            {showInput ? "Send" : "AI"}
          </button>
        </div>
      </div>
    </div>
  );
}
