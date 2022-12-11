import {api} from "./api"

export const saveRoom = (room:any) => {
    const url = "session";
    return api.post(url,room);
}
/*
export const getRoomById = (id:number) => {
    const url = "session";
    return api.get<Room>(url,{params:{id}});
}

export const  getAllRooms = () => {
    const url = "session/all";
    api.get<RoomList>(url).then(
        res =>{ return(res.data)});
}*/