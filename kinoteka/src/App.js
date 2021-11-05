import './App.css';
import * as React from 'react';
import SignInSide from './pages/SignInSide';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthContext from './store/auth-context';

function App() {
  const { isAdmin } = React.useContext(AuthContext);
  const { path } = useRouteMatch();

  if (isAdmin === false) {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={SignInSide}></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path={path} component={Dashboard}></Route>
        <Route element={<p>Not found</p>}></Route>
      </Switch>
    </div>
  );
}

export default App;
