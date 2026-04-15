"use client";
import { useState } from "react";
import style from "./style/main.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("");// option is unimplemented
  const [showLogButtons, setShowLogButtons] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logType, setLogType] = useState("login");
  const [password, setPassword] = useState("");

  async function log(type) {// login and register
    setShowLogButtons(false);// unimplemented
  }
  async function agent() {// agent
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
      {/* main menu (login and register) */}

      <div className={style.log}>
        {showLogButtons && (
          <div className={style.vertical}>
            <h1 className={style.title}>Get Now</h1>
            <button
              className={style.logButton}
              onClick={() => {
                setLogType("register");
                log();
              }}
            >
              register
            </button>
            <button
              className={style.logButton}
              onClick={() => {
                setLogType("login");
                log();
              }}
            >
              Login
            </button>
          </div>
        )}

        {/* input and register field */}

        {!showLogButtons && (
          <div className={style.vertical}>
            <h1 className={style.title}>{logType}</h1>
            <input
              className={style.phoneInput}
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.toString())}
            />
            <div>
              {/* OTP if register */}
              {logType === "register" ? (
                <button
                  className={style.logButton}
                  onClick={() => alert("OTP")}
                >
                  OTP
                </button> // unimplemented
              ) : (

                // pw if user click login

                <div className={style.vertical}>
                  <input
                    className={style.phoneInput}
                    type="number"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.toString())}
                  />
                  <button
                    className={style.logButton}
                    onClick={() => alert("pw submit")}
                  > submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Chat bar at the bottom */}

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
