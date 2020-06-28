import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken(key) {
  return Cookies.get(key || TokenKey);
}

export function setToken(key, token) {
  return Cookies.set(key || TokenKey, token);
}

export function removeToken(key) {
  return Cookies.remove(key || TokenKey);
}
