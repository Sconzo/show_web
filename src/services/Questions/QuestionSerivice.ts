import { QuestionDisplayList } from "../../zus/session"
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
export type QuestionList = IQuestion[]

const getQuestionById = async (questionId : number): Promise<Question | Error> => {
    try{
        const { data } = await Api.get(`/${questionId}`)
        if(data){
            return(data);
        }
        return new Error("Sem dados");
    }
    catch (error){
        return new Error("Sem dados");
    }
}

const getQuestionsForSession = async (sessionId : number): Promise<QuestionDisplayList| Error> => {
    try{
        const { data } = await Api.get(`/question/${sessionId}`)
        if(data){
            return(data);
        }
        return new Error("Sem dados");
    }
    catch (error){
        return new Error("Sem dados");
    }
}

const checkCorrectAnswer = async (choiceId : number, questionId : number): Promise<Boolean | Error> => {
    try{
        const { data } = await Api.get('/question/check',{ params: { 
            choiceId: choiceId,
            questionId: questionId,
         } })
        if(data || data===false){
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
    getQuestionsForSession,
    checkCorrectAnswer
}