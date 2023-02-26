import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <App/>
    </BrowserRouter>
  
);
