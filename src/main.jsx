import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Buffer } from "buffer";

/**
 * 防止被注入
 */
Object.defineProperty(window, "Buffer", {
  value: Buffer,
  writable: false,
  configurable: false,
  enumerable: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
