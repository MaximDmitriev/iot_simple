import { createContext, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { MainPage, LoginPage, NotFoundPage } from './pages';
import { useProvideAuth } from './services/auth';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import dayjsUtils from '@date-io/dayjs';

import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { getCookieSecurity } from './services/common';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: 'url(/img/iot4.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
    height: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

// @ts-ignore
const authContext = createContext();
export function useAuth() {
  return useContext(authContext);
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  // @ts-ignore
  const token = auth.user?.token || getCookieSecurity();
  return (
    <Route {...rest} render={({ location }) => (token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} />
  );
}

function App() {
  const classes = useStyles();

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={5}
      preventDuplicate
    >
      <MuiPickersUtilsProvider utils={dayjsUtils}>
        <Container maxWidth="lg">
          <Container maxWidth="lg" className={classes.root}>
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
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  );
}

export default App;
