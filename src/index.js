import { createRoot } from "react-dom/client";
import App from "./App.js";
import React from "react";
import { gameSetup } from "empire-of-evil"

const container = document.getElementById("app");
const root = createRoot(container);
const gameManager = gameSetup.createGameManager()
root.render(<App gameManager={gameManager}/>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
