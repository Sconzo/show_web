import { useNavigate } from "react-router-dom";
import "./style.css";


const HostWait = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/challenger";
        navigate(path);
    }
    

    return (
        <div className="host-wait-content">
            <h1 className="host-wait-title">x/X grupos finalizados</h1>

            <div className="game-summary">
                <h2> Y Desafiante</h2>
                <h2> Z Perguntas por Desafiante</h2>
            </div>

            <button 
                type="button"
                className="btn-initialize"
                onClick={routeChange}>Iniciar Jogo!!</button>
        </div>
        )
}

export default HostWait