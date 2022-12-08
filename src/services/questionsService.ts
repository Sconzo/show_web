import {api} from "./api"

export const saveQuestion = (questions:any) => {
    const url = "question";
    return api.post(url,questions);
}

export const getQuestionById = (id:number) => {
    const url = "question";
    return api.get(url,{params:{id}});
}