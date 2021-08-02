import dayjs from 'dayjs';

export function getCookie(name) {
  const matches = document.cookie
    .match(new RegExp('(?:^|; )'
      + (name + (document.location.port ? '_' : '')
      + document.location.port).replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
      + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getCookieSecurity() {
  return getCookie('security_token');
}


// options.expires время жизни Cookie в миллисекундах
export function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires || dayjs(new Date()).add(7, 'day').unix();
  if (typeof expires == 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + (document.location.port ? '_' : '') + document.location.port + '=' + value;

  // eslint-disable-next-line guard-for-in
  for (const propName in options) {
    updatedCookie += '; ' + propName;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, '', {
    expires: -1,
  });
}

export function deleteCookieSecurity() {
  deleteCookie('security_token');
}
