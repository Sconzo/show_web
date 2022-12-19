import create from 'zustand'
import { Question } from '../services/Questions/QuestionSerivice';

type QuestionList = {
    questions : Question[],
    addQuestion:(question:Question) => void,
    updateQuestion:(pos:number, question:Question) => void,
}

const getQuestions = create<QuestionList>((set) => ({
    questions : [],
    
    addQuestion:(question : Question)=>{
        set(state => ({questions : [...state.questions, question]}))
    },

    updateQuestion:(pos:number, question:Question) =>{
        set(state => ({
            questions: [...state.questions.slice(0,pos), question,...state.questions.slice(pos+1)]}))
    }
}))

export default getQuestions