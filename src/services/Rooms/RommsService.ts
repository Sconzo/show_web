import { Api } from "../axios-config"

interface IRoomSummary{
    sessionId: 0,
    sessionName: "",
    createdIn: "",
  }
  
interface IRoom{
    sessionName: "",
    numberOfQuestions: 0,
    numberOfGroups: 0,
    numberOfChallengers: 0,
    cards: false,
    studentsHelp:false,
    skips:false,
    audienceHelp:false,
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

const create = async (room : Room): Promise<string | Error> => {
    try{
        const { data } = await Api.post<IRoom>('/session', room)
        if(data){
            return(data.sessionName);
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