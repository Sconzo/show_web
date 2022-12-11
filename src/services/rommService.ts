import {api} from "./api"

export const saveRoom = (room:any) => {
    const url = "session";
    return api.post(url,room);
}

export const getRoomById = (id:number) => {
    const url = "session";
    return api.get(url,{params:{id}});
}