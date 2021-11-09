import axios from 'axios';

const api = axios.create({ baseURL: process.env.NODE_ENV === 'prod' ? 'https://rubix-store.herokuapp.com/' : 'http://localhost:4000/' });

export default api;
