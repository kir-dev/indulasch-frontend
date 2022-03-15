import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SettingsProvider } from "./utils/settings-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MessengerPage } from "./components/messengerPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <Routes>
          <Route path="/messenger" element={<MessengerPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
