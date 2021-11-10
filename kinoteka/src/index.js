import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LayoutContextProvider } from './store/layout-context';
import AuthContext from './store/auth-context';
import SelectedCategoryContext from './store/selected-category-context';
import SelectedActorContext from './store/selected-actor-context';

function Main() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      <SelectedCategoryContext.Provider
        value={{ selectedCategories, setSelectedCategories }}
      >
        <SelectedActorContext.Provider
          value={{ selectedActors, setSelectedActors }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SelectedActorContext.Provider>
      </SelectedCategoryContext.Provider>
    </AuthContext.Provider>
  );
}

ReactDOM.render(
  <LayoutContextProvider>
    <Main />
  </LayoutContextProvider>,
  document.getElementById('root'),
);
