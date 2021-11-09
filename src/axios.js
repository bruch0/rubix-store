import axios from 'axios';

const api = axios.create({ baseURL: process.env.NODE_ENV === 'production' ? 'https://rubix-store.herokuapp.com/' : 'http://localhost:4000/' });
console.log(process.env);

export default api;
