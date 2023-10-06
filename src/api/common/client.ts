import {handleServerError, showError, showErrorMessage} from '@libs/error';
import {useAuthStore} from '@store/AuthStore';
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
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    const errorMessage = handleServerError(error);
    showError(error);
    showErrorMessage(errorMessage);
    return Promise.reject(error);
  },
);
