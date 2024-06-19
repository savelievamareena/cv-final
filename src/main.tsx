import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./i18n";
import "./dayjs";
import { App } from "./components/app";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
