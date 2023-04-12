import axios from 'axios'

const Api = axios.create({
  baseURL:"https://young-thor-beige-morocco.bohr.io/api/",
  responseType:"json",
  headers:{
    "Content-Type": "application/json",
  }
});


export { Api }
