import { createContext, useContext } from 'react';
import dayjsUtils from '@date-io/dayjs';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage, LoginPage, NotFoundPage } from './pages';
import { useProvideAuth } from './services/auth';
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

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  const token = auth.user?.token || getCookieSecurity();

  return (
    <Route {...rest} render={({ location }) => (token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} />
  );
};

const App = () => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={5}
    >
      <MuiPickersUtilsProvider utils={dayjsUtils}>
        <Container maxWidth="lg">
          <Container className={classes.root} maxWidth="lg">
            <ProvideAuth>
              <Switch>
                <PrivateRoute path="/report">
                  <MainPage />
                </PrivateRoute>
                <PrivateRoute exact path="/">
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
};

export default App;
