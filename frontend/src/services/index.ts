import axios, { AxiosInstance } from 'axios';

//api.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common[
    'Access-Control-Allow-Origin'
] = `${process.env.REACT_APP_BASE_URL}`;
axios.defaults.withCredentials = true;
const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

let config = {
    headers: {},
};

const getLast = async (currency: string, days: number) => {
    api.get(`/currencies/lately?currency=${currency}&days=${days}`, config)
        .then((response) => {
            console.log(response.data.data);

            if (response.data !== null) return response.data.data;
            else {
                console.log('get info failed');
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('get info failed');
        });
    return null;
};

const getBoxesData = async () => {
    api.get('/currencies/now', config)
        .then((response) => {
            if (response.data !== null) return response.data.data;
            else {
                console.log('get info failed');
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('get info failed');
        });
    return null;
};

const signIn = async (email: string, password: string) => {
    api.get(`/sign-in`, {
        auth: {
            username: email,
            password: password,
        },
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
            console.log('get info failed');
        });
};

export { signIn, getBoxesData, getLast };
