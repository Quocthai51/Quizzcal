import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import "./App.css";
// import qData from "./data.json";
import QuestionList from "./components/QuestionList";

import top from "./assets/top.png";
import bot from "./assets/bot.png";
import topSm from "./assets/top-sm.png";
import botSm from "./assets/bot-sm.png";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  
  return (
    <div className="App">
      <header className="App-header">
        {gameStarted ? (
          <div>
            <img
              style={{ position: "absolute", top: 0, right: 0 }}
              src={topSm}
              alt="top-sm"
            />
            <img
              style={{ position: "absolute", bottom: 0, left: 0 }}
              src={botSm}
              alt="bot-sm"
            />

            <QuestionList />
          </div>
        ) : (
          <div>
            <img
              style={{ position: "absolute", top: 0, right: 0 }}
              src={top}
              alt="top"
            />
            <img
              style={{ position: "absolute", bottom: 0, left: 0 }}
              src={bot}
              alt="bot"
            />
            <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
              <h1 style={{ marginBlockEnd: 10 }}> Quizzical</h1>
              <p style={{ marginBlockEnd: 10 }}>
                App for testing your knowledge about anime
              </p>
              <button
                style={{ marginBlockStart: 25 }}
                className="btn-start"
                onClick={() => setGameStarted(true)}
              >
                Start quiz
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
