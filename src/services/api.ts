import axios from 'axios'

export const api = axios.create({
    baseURL:"http://localhost:8080/",
    responseType:"json",
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});
