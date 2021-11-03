import './App.css';
import * as React from 'react';
import SignInSide from './pages/SignInSide';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path="/" exact component={SignInSide}></Route>
        <Route path={path} component={Dashboard}></Route>
        <Route element={<p>Not found</p>}></Route>
      </Switch>
    </div>
  );
}

export default App;
