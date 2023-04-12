import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL:"https://great-volleyball-gold-ireland.bohr.io",
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
