import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { gameSetup } from "empire-of-evil"
import { store } from "./app/store";
import { Provider} from "react-redux";

if (process.env.NODE_ENV === 'development'){
    if (module.hot) {
        module.hot.accept();
      }
}

const gameManager = gameSetup.createGameManager();

// const store = setupStore({
//   gameManager:{ 
//     initialized: false,
//     saveData: localStorage.getItem("eoe-save")
//   },
// })

const container = document.getElementById("app");
const root = createRoot(container);
// Enable navigation prompt
// window.onbeforeunload = function() {
//   return true;
// };

root.render(
  <Provider store={store} >
    <App gameManager={gameManager}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
