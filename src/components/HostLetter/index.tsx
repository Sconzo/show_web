import "./style.css";
import { useNavigate } from "react-router-dom";

function HostLetter() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = "/host-home"; 
        navigate(path);
      }
    return (
      <div className="letter">
            <p className="letter-title">Sua missão será:</p>
            <div>
                <p className="letter-items">Primeiramente você deverá adicionar os X desafiantes que irão responder as perguntas</p>
                <p className="letter-items">Você é responsável por fazer a apresentação do show, lendo as perguntas para o desafiante e para o público</p>
                <p className="letter-items">Você deve selecionar a resposta que o desafiante escolher, bem como dar a ele as opções de ajuda disponíveis</p>
                <button className="letter-button" onClick={routeChange}>Continuar</button>
            </div>
      </div>
    )
  }
  
  export default HostLetter