import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if(error.message === 'Network Error'){
        return Promise.reject(new Error("Error de conexão"))
    }
    if(error.response?.status === 404){
        return Promise.reject(new Error("Objeto não encontrado"))
    }

    return Promise.reject(error);
}