import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL:"https://young-thor-beige-morocco.bohr.io/api/",
  responseType:"json",
  headers:{
    "Content-Type": "application/json",
  }
});


export { Api }
