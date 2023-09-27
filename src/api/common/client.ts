import axios from 'axios';

const Env = {
  API_URL: 'https://ofayd-core-backend-81b18a7c7ac1.herokuapp.com',
};
export const client = axios.create({
  baseURL: `${Env.API_URL}/v1/`,
  withCredentials: true,
});

client.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
