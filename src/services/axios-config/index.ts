import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
    baseURL:"http://localhost:8080/",
    responseType:"json",
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
)

export { Api }