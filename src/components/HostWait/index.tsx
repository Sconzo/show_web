import { useNavigate } from "react-router-dom";
import "./style.css";
import useSession from "../../zus/session";
import { QuestionService } from "../../services/Questions/QuestionSerivice";

const HostWait = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/challenger";
        navigate(path);
    }
    
    const session = useSession(state => state.session)
    const updateQuestions = useSession(state => state.updateQuestionList)

    const sessionId = useSession(state => state.session).sessionId
    QuestionService.getQuestionsForSession(sessionId)
      .then(q => {
        if(q instanceof Error){
          alert(q.message)
          return
        }
        updateQuestions(q)
        })
      
    return (
        <div className="host-wait-content">
            <h1 className="host-wait-title">x/{session.numberOfGroups} grupos finalizados</h1>

            <div className="game-summary">
                <h2> {session.numberOfChallengers} Desafiante</h2>
                <h2> {session.numberOfQuestions / session.numberOfChallengers} Perguntas por Desafiante</h2>
            </div>

            <button 
                type="button"
                className="btn-initialize"
                onClick={routeChange}>Iniciar Jogo!!</button>
        </div>
        )
}

export default HostWait