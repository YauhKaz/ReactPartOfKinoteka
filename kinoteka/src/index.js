import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LayoutContextProvider } from './store/layout-context'

ReactDOM.render(
  <LayoutContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </LayoutContextProvider>,
  document.getElementById('root')
);

