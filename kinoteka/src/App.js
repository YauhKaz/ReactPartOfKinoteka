import './App.css';
import * as React from 'react';
import SignInSide from './pages/SignInSide';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <SignInSide />
        </Route>
        <Route path="/main">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
