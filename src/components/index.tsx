import React from "React";
import ReactDOM from "React-dom/client";
import "./index.css";
import App from "./app.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
