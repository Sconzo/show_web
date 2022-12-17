import create from 'zustand'
import { QuestionList } from '../services/Questions/QuestionSerivice';
import { Room } from '../services/Rooms/RommsService'

export type optionsDisplay = [
    {
        id: number,
        description: string,
      },
      {
        id: number,
        description: string,
      },
      {
        id: number,
        description: string,
      },
      {
        id: number,
        description: string,
      },
  ]

interface IQuestionDisplay{
    questionDescription: string,
    questionId:number,
    type:string,
    level:string,
    options: optionsDisplay,   
    sessionId:number,
  }

  export type QuestionDisplayList = IQuestionDisplay[];

type CurrentSession = {
    session : Room,
    changeSession:(session:Room) => void,
    questions : QuestionDisplayList,
    updateQuestionList:(list:QuestionDisplayList)=>void,
}

const useSession = create<CurrentSession>((set) => ({
    session:{
        sessionName: "",
        numberOfQuestions: 0,
        numberOfGroups: 0,
        numberOfChallengers: 0,
        cards: false,
        studentsHelp:false,
        skips:false,
        audienceHelp:false,
        sessionId: 0,
        createdIn: "",
    },
    
    changeSession:(sessionIncome : Room)=>{
        set(state => ({session : sessionIncome}))
    },

    questions:[],
    updateQuestionList:(list : QuestionDisplayList)=>{
        set(state => ({questions : list}))
    },
}))

export default useSession