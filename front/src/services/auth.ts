import { useState } from 'react';
import type { UsedDto } from '../interfaces';
import { deleteCookie, deleteCookieSecurity } from './common';
import { fetchService } from './fetch-data';

/** Сообщения в ответе сервера. */
interface ResponseMessage {
  msg: string;
  type: string;
}

const auth = {
  isLogin: false,
  signIn(userLogin: string, password: string, cb: (props: UsedDto & { messages: ResponseMessage[] }) => void) {
    fetchService
      .data({ login: userLogin, password })
      .logIn()
      .then(res => {
        // @TODO refactor
        const response: {
          messages: ResponseMessage[];
          user: UsedDto;
          auth: { accessToken: string; refreshToken: string };
        } = typeof res === 'string' ? JSON.parse(res) : res;

        const { user, auth: responseAuth, messages } = response;
        const { name, login, roles } = user;

        cb({
          token: responseAuth.accessToken,
          name,
          login,
          roles,
          messages,
        });
      })
      .catch(err => console.error(err));
  },
  signOut(cb: () => void) {
    cb();
    fetchService
      .data({})
      .logOut()
      .catch(err => console.error(err));
  },
};

export interface AuthContext {
  user?: UsedDto;
  isLogin?: boolean;
  signIn?(login: string, password: string, cb: (props: UsedDto & { messages: ResponseMessage[] }) => void): void;
  signOut?(): void;
}

export const useProvideAuth = (): AuthContext => {
  const [user, setUser] = useState<UsedDto | undefined>(undefined);

  const signIn = (login: string, password: string, cb: (props: UsedDto & { messages: ResponseMessage[] }) => void) =>
    auth.signIn(login, password, props => {
      if (props.token) {
        setUser({
          name: props.name,
          login: props.login,
          roles: props.roles,
          token: props.token,
        });
      }

      cb(props);
      auth.isLogin = true;
    });

  const signOut = () =>
    auth.signOut(() => {
      setUser(undefined);
      deleteCookieSecurity();
      deleteCookie('current_user');
      auth.isLogin = false;
    });

  return {
    user,
    signIn,
    signOut,
    isLogin: auth.isLogin,
  };
};
