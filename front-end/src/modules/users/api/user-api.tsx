// src/modules/api/user-api.ts
import axios from 'axios';

const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
});

export const doRegister = (userData: unknown) => {
  console.log('User Data:', userData);
  return userApi.post('register', userData);
};

export const doLogin = (userData: unknown) => {
  console.log('User Data:', userData);
  return userApi.post('login', userData);
};
