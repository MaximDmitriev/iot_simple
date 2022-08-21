import dayjs from 'dayjs';

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        (name + (document.location.port ? '_' : '') + document.location.port).replace(/([$()*+./?[\\\]^{|}])/g, '\\$1') +
        '=([^;]*)'
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getCookieSecurity = () => getCookie('security_token');

// options.expires время жизни Cookie в миллисекундах
export const setCookie = (name: string, value: string, options: Record<string, string> & { expires?: string } = {}) => {
  const expires = options.expires || dayjs(new Date()).add(7, 'day').unix().toString();

  let date: Date | undefined;

  if (expires) {
    const d = new Date();

    date = new Date(d.setTime(d.getTime() + parseInt(expires)));
  }

  if (date?.toUTCString) {
    options.expires = date?.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);

  let updatedCookie = name + (document.location.port ? '_' : '') + document.location.port + '=' + encodedValue;

  // eslint-disable-next-line guard-for-in
  for (const propName in options) {
    updatedCookie += '; ' + propName;

    const propValue = options[propName];

    if (propValue) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = name => {
  setCookie(name, '', {
    expires: '-1',
  });
};

export const deleteCookieSecurity = () => {
  deleteCookie('security_token');
};
