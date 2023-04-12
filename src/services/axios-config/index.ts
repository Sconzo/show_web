import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  responseType:"json",
  headers:{
    "Content-Type": "application/json",
  }
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
)

export { Api }
