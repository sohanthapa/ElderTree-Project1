import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';


render(
   <Router>
      {/*<Dashboard />*/}
      <SignUp />
   </Router>,
   document.getElementById('root')
);
