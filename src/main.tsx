import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { InsightsProvider } from '../lib/InsightsProvider'

ReactDOM.render(
  <React.StrictMode>
    <InsightsProvider>
      <App />
    </InsightsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
