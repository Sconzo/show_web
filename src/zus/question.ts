import create from 'zustand'
import { Question } from '../services/Questions/QuestionSerivice';

type QuestionList = {
    questions : Question[],
    addQuestion:(question:Question) => void;
}

const getQuestions = create<QuestionList>((set) => ({
    questions : [],
    
    addQuestion:(question : Question)=>{
        set(state => ({questions : [...state.questions, question]}))
    }
}))

export default getQuestions