import { useState } from 'react';
import { deleteCookie, deleteCookieSecurity } from './common';
import { fetchService } from './fetchData';

const auth = {
  isLogin: false,
  signIn(login, password, cb) {
    fetchService
      .data({ login, password })
      .logIn()
      .then(res => {
        console.log(res);

        const response = typeof res === 'string' ? JSON.parse(res) : res;

        cb({
          token: response.auth.accessToken,
          name: 'demo',
          login: 'demo',
          role: 'admin',
        });
      })
      .catch(err => console.error(err));
  },
  signOut(cb) {
    cb();
    fetchService
      .data({})
      .logOut()
      .catch(err => console.error(err));
  },
};

export const useProvideAuth = () => {
  const [user, setUser] = useState({});

  const signIn = (login, password, cb) =>
    auth.signIn(login, password, props => {
      if (props.token) {
        setUser({
          name: props.username,
          login: props.login,
          role: props.role,
          token: props.token,
        });
      }

      cb(props);
      auth.isLogin = true;
    });

  const signOut = () =>
    auth.signOut(() => {
      setUser({});
      deleteCookieSecurity();
      deleteCookie('current_user');
      auth.isLogin = false;
    });

  return {
    user,
    signIn,
    signOut,
    // isLogin,
  };
};
