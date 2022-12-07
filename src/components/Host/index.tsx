import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const challengers = [
    {
        name: "",
        id: 0,
    },
]


function Host() {
    challengers.pop();
    const [challengerList, setChallengerList] = useState(challengers);

    const [challengerName, setChallengerName] = useState('');

    const handleInput = (event : any) => {
        setChallengerName(event.target.value);
    }

    const getChallenger = (event : any, challengerName : any) => {
        event.preventDefault();
        let challenger;
        if(challengerName.length > 0){
            if(challengerList.length>0){
                challenger = {
                    name: challengerName,
                    id:challengerList[challengerList.length-1].id + 1,
                }
            }
            else{
                challenger = {
                    name: challengerName,
                    id:1,
                }
            }
            setChallengerList([...challengerList, challenger])
        }
        event.target.reset();
    }
    

    const deleteChallenger = (event : any, challenger : any) => {
        event.preventDefault();
        const data = challengerList.filter(chal => chal.id != challenger.id);
        setChallengerList(data);
        console.log(data);
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/host-wait';
        navigate(path);
    }

    const saveChallengers = (event : any, col : number) =>{

        var table = document.getElementsByTagName('table')[0];
        var arr = [];
        for (let i = 0; i < table.rows.length; i++){
            arr.push(table.rows[i].cells[1].innerText);
        }
        routeChange();
        
    }

    return (
      <>
        <div className="host-content">

            <form>
                <div className="input-box">
                    <input
                        className="input-name"
                        type={"text"}
                        placeholder="Ex.: Fávaro"
                        onChange={($event) => handleInput($event)}
                        />
                    <button 
                        className="btn-add" 
                        onClick={($event) => getChallenger($event, challengerName)}>Adicionar</button>
                </div>
            </form>


            <h3 className="challenger-info">Desafiantes Adicionados {challengerList.length}/X</h3>

            <div className="challenger-table">
                <table>
                    <tbody>
                        {challengerList.map(challenger => (
                            <tr>
                                <td>
                                    <button 
                                        className="btn-exclude-challenger" 
                                        type="button"
                                        onClick={($event) => deleteChallenger($event, challenger)}>
                                    </button>
                                </td>
                                <td>{challenger.name}</td>
                                
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <button 
                className="btn-save" 
                onClick={($event) => saveChallengers($event, 1)}>Salvar</button>
        </div>
      </>
    )
  }
  
  export default Host