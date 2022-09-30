import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthProvider } from "./providers/AuthProvider";

// Router For App to use React Router Dom Libary
import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
</React.StrictMode>
);
