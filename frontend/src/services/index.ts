import axios, { AxiosInstance } from 'axios';
import 'dotenv/config';

//api.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.URL}`;                            
axios.defaults.withCredentials = true

const api: AxiosInstance = axios.create({
    baseURL: process.env.URL
        
});

export default api;