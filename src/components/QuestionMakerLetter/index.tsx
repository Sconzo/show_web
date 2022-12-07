import "./style.css";
import { useNavigate } from "react-router-dom";

function Letter() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = "/group-leader-home"; 
        navigate(path);
      }
    return (
      <div className="letter">
            <p className="letter-title">Sua missão será:</p>
            <div>
                <p className="letter-items">tipo, o endpoint com o strSearch, como é mock, eu sempre retorno o mesmo dado </p>
                <p className="letter-items">Reunião com a Aliança de MIRO sem nenhum ajuste posterior necessário, DevOps em andamento (entrega amanhã)</p>
                <p className="letter-items">união com a Aliança de MIRO sem nenhum ajuste posterior necessário, DevOps em andamento (entrega amanhã)</p>
                <p className="letter-items">Agradecer a participação do Rodrigo Polydoro</p>
                <button className="letter-button" onClick={routeChange}>Continuar</button>
            </div>
      </div>
    )
  }
  
  export default Letter