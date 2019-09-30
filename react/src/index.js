import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './components/dashboard/Dashboard';

render(
  <Router>
    {/* <App /> */}
    <Dashboard />
  </Router>,
  document.getElementById('root'),
);
