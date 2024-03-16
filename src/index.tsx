import { createRoot } from "react-dom/client";
import App from "./App";
import { GameManager, gameSetup } from "empire-of-evil";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export interface IntegratedManagerProps {
  gameManager: GameManager;
}

const gameManager = gameSetup.createGameManager();

const container = document.getElementById("app");
const root = createRoot(container);

// Enable navigation prompt
if (store.getState().config.haltReload) {
  window.onbeforeunload = function () {
    return true;
  };
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <App gameManager={gameManager} />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
