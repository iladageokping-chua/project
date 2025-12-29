import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
