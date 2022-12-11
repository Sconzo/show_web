import { Api } from "../axios-config"

export interface IChallenger {
    name:string,
    score:number,
    sessionId:number,
    cardsLeft:number,
    studentsHelpLeft:number,
    skipsLeft:number,
    audienceHelpLeft:number,
}

export type ChallengerList = IChallenger[]

const create = async (challengers : ChallengerList): Promise<string | Error> => {
    try{
        const { data } = await Api.post('/challenger', challengers)
        if(data){
            return(data.name);
        }
        return new Error("Erro ao criar participante");
    }
    catch (error){
        return new Error("Erro ao criar participante");
    }
}

export const ChallengerService = {
    create,
}