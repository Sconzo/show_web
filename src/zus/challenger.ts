import create from 'zustand'
import { Challenger } from '../services/Challengers/ChallengerService'

type CurrentChallenger = {
    challengers : Challenger[],
    currentPosition: number,
    addChallengers:(challenger:Challenger[]) => void,
    increaseChallengerPosition:(pos:number) => void,
    updateChallengerScore:(pos:number, challenger:Challenger) => void,
}

const useChallenger = create<CurrentChallenger>((set) => ({
    challengers : [],
    currentPosition:0,
    addChallengers:(challengerIncome:Challenger[]) =>{
        set({ challengers : challengerIncome})
    },
    increaseChallengerPosition:(pos:number)=>{
        set({currentPosition: pos+1})
    },
    updateChallengerScore:(pos:number, challenger:Challenger)=>{
        set(state => ({
            challengers: [...state.challengers.slice(0,pos), challenger,...state.challengers.slice(pos+1)]}))
    }
}))

export default useChallenger