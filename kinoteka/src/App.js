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
        <Route path="/movies">
          <Dashboard />
        </Route>
        <Route path="/images">
          <Dashboard />
        </Route>
        <Route path="/categories">
          <Dashboard />
        </Route>
        <Route path="/actors">
          <Dashboard />
        </Route>
        <Route path="/actors/new">
          <Dashboard />
        </Route>
        <Route path="/actors/:id">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
