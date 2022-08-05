import { useState } from 'react';
import { fetchService } from './fetchData';
import { deleteCookie, deleteCookieSecurity } from './common';

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

export function useProvideAuth() {
  const [user, setUser] = useState({});

  const signIn = (login, password, cb) => {
    return auth.signIn(login, password, (props) => {
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
  };

  const signOut = () => {
    return auth.signOut(() => {
      setUser({});
      deleteCookieSecurity();
      deleteCookie('current_user');
      auth.isLogin = false;
    });
  };

  return {
    user,
    signIn,
    signOut,
    // isLogin,
  };
}
