import React, { createContext, useContext, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { MainPage, LoginPage, NotFoundPage } from './pages';
import { useProvideAuth } from './services/auth';

import { makeStyles } from '@material-ui/core/styles';
import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url(/img/iot4.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0
  },
}));

const authContext = createContext();
export function useAuth() {
  return useContext(authContext);
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => auth.user
        ? children
        : <Redirect to={{ pathname: "/login", state: { from: location } }} />}
    />
  );
}

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Container maxWidth="lg" className={classes.root} >
        <ProvideAuth>
          <Switch>
            <PrivateRoute path="/report">
              <MainPage />
            </PrivateRoute>
            <PrivateRoute path="/" exact>
              <MainPage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </ProvideAuth>
      </Container>
    </Container>
  );
}

export default App;
