import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import { App } from './App'

import "normalize.css";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)