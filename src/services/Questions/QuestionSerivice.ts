import { Api } from "../axios-config"

export type optArrayType = [
    {
        optionNumber: number,
        correctOption: boolean,
        optionText: string,
      },
      {
        optionNumber: number,
        correctOption: boolean,
        optionText: string,
      },
      {
        optionNumber: number,
        correctOption: boolean,
        optionText: string,
      },
      {
        optionNumber: number,
        correctOption: boolean,
        optionText: string,
      },
  ]

interface IQuestion{
    questionDescription: string,
    type:string,
    level:string,
    options: optArrayType,   
    sessionId:number,
  }

export type Question = IQuestion

const getQuestionById = async (): Promise<Question | Error> => {
    try{
        const { data } = await Api.get('/question')
        if(data){
            return(data);
        }
        return new Error("Sem dados");
    }
    catch (error){
        return new Error("Sem dados");
    }
}

const getQuestionsForChallenger = async (): Promise<Question[] | Error> => {
    try{
        const { data } = await Api.get('/question')
        if(data){
            return(data);
        }
        return new Error("Sem dados");
    }
    catch (error){
        return new Error("Sem dados");
    }
}


const createQuestion = async (questions : Question[]): Promise<string | Error> => {
    try{
        const { data } = await Api.post<IQuestion>('/question', questions)
        if(data){
            return(data.questionDescription);
        }
        return new Error("Erro ao criar sala");
    }
    catch (error){
        return new Error("Erro ao criar sala");
    }
}

export const QuestionService = {
    getQuestionById,
    createQuestion,
}