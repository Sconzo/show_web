import create from 'zustand'
import { Room } from '../services/Rooms/RommsService'

type CurrentSession = {
    session : Room,
    changeSession:(session:Room) => void;
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
    }
}))

export default useSession