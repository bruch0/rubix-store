/* eslint-disable no-unused-vars */
import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://rubix-store.herokuapp.com/'
      : 'http://localhost:4000/',
});

function getConfig(token) {
  return {
    headers: {
      'x-access-token': token,
    },
  };
}

export default function postSignIn(email, password) {
  return api.post('/auth/sign-in', {
    email,
    password,
  });
}

export { api };
