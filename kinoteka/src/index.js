import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LayoutContextProvider } from './store/layout-context';
import AuthContext from './store/auth-context';

function Main() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

ReactDOM.render(
  <LayoutContextProvider>
    <Main />
  </LayoutContextProvider>,
  document.getElementById('root'),
);
