import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./App.css"
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/context';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <BrowserRouter>
      <UserProvider>
        <Toaster/>
        <App />
      </UserProvider>
    
    </BrowserRouter>
    
  
);

