import { createContext, useContext } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackbarProvider } from 'notistack';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage, LoginPage, NotFoundPage } from './pages';
import type { AuthContext } from './services/auth';
import { useProvideAuth } from './services/auth';
import './App.css';
import { getCookieSecurity } from './services/common';

const BackgroundContainer = styled(Container)`
  background-image: url(/img/iot4.png);
  background-repeat: no-repeat;
  background-position-y: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const authContext = createContext<AuthContext>({});

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

const App = () => (
  <SnackbarProvider
    preventDuplicate
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    maxSnack={5}
  >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <BackgroundContainer maxWidth="xl">
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
        </BackgroundContainer>
      </Container>
    </LocalizationProvider>
  </SnackbarProvider>
);

export default App;
