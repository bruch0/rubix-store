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

const postSignIn = (email, password) => api.post('/auth/sign-in', {
  email,
  password,
});

const postSignUp = (name, email, password, cpf, phone) => api.post('/auth/sign-up', {
  name,
  email,
  password,
  cpf,
  phone,
});

const postCart = (productId, productQty, token) => api.post('/cart', {
  product_id: productId,
  product_qty: productQty,
}, getConfig(token));

const getProduct = (productId) => api.get(`/product/${productId}`);

export {
  api,
  postSignIn,
  postSignUp,
  postCart,
  getProduct,
};
