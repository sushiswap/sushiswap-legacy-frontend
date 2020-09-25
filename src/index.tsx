import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { TransProvider } from 'use-i18n'
import i18n from './i18n.js'

ReactDOM.render(
  <React.StrictMode>
    <TransProvider i18n={i18n}>
      <App />
    </TransProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
