import { Api } from "../axios-config"

interface IRoomSummary{
    sessionId: 0,
    sessionName: "",
    createdIn: "",
  }
  
interface IRoom{
    sessionId: 0,
    sessionName: "",
    numberOfQuestions: 0,
    numberOfGroups: 0,
    numberOfChallengers: 0,
    cards: false,
    students:false,
    skips:false,
    audienceHelp:false,
    createdIn: "",
  }
export type Room = IRoom
export type RoomList = IRoomSummary[]

const getAll = async (): Promise<RoomList | Error> => {
    try{
        const { data } = await Api.get('/session/all')
        if(data){
            return(data);
        }
        return new Error("Sem dados");
    }
    catch (error){
        return new Error("Sem dados");
    }
}

const create = async (data : Omit<Room, "id">): Promise<number | Error> => {
    try{
        const { data } = await Api.post<Room>('/session')
        if(data){
            return(data.sessionId);
        }
        return new Error("Erro ao criar sala");
    }
    catch (error){
        return new Error("Erro ao criar sala");
    }
}

export const RoomsService = {
    getAll,
    create,
}