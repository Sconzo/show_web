import { useNavigate } from "react-router-dom";
import "./style.css";
import useSession from "../../zus/session";

const HostWait = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/challenger";
        navigate(path);
    }
    
    const session = useSession(state => state.session)

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