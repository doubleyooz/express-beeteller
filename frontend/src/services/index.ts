import axios, { AxiosInstance } from 'axios';

//api.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common[
    'Access-Control-Allow-Origin'
] = `${process.env.REACT_APP_BASE_URL}`;
axios.defaults.withCredentials = true;

console.log(`${process.env.REACT_APP_BASE_URL}`);
const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
