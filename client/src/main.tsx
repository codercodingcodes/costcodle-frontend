import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import {patchUrlMappings} from "@discord/embedded-app-sdk";
patchUrlMappings([{prefix: '/log', target: 'https://b57458227a52237b9a973fa466c31d14@o4510660094787584.ingest.us.sentry.io/4510660099112960'}]);
Sentry.init({
    dsn: "https://1445980061390999564.discordsays.com/log",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    enableLogs: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
