import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';


import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';



import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
