import React from "react";
import "./style.scss"
import { useNavigate } from "react-router-dom";
import { saveRoom } from "../../services/rommService";

const CreateRoom = () => {

    const initialFormData = Object.freeze({
        sessionName: "",
        questionsPerChallenger: "",
        numberOfChallengers: "",
        numberOfGroups: "",
        cards: false,
        studentsHelp: false,
        audienceHelp: false,
        skips: false,
    });

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate("/");
      }

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleSubmit = (e: any) => {
        e.preventDefault();
<<<<<<< HEAD
=======
        saveRoom(formData)
>>>>>>> 387cd9ef55cfaf29027966c41a1820127f49a635
        //console.log(formData);
        routeChange();
    };

    const handleChange = (e: any) => {
        
        if(e.target.type === "checkbox"){
            let boo : boolean = false;
            if(e.target.checked){
                boo = true;
            }
            updateFormData({
                ...formData,
                [e.target.name]: boo,
            });
        }
        else{
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            });
        }
    };
    

    return (
        <>
            <div className="creation-content">
                
                <form >
                    <div className="box-text-input">
                    
                        <label>
                            Nome da Sala
                            <input
                                type="text"
                                className="input-text"
                                name="sessionName"
                                onChange={handleChange} />
                        </label>

                        <label>
                            Número de Perguntas por Desafiante
                            <input
                                type="number"
                                min={1}
                                className="input-text"
                                name="questionsPerChallenger" 
                                onChange={handleChange}/>
                        </label>
                        <label>
                            Número de Desafiantes
                            <input
                                type="number"
                                min={1}
                                className="input-text"
                                name="numberOfChallengers" 
                                onChange={handleChange} />
                        </label>
                        <label>
                            Número de Grupos
                            <input
                                type="number"
                                min={1}
                                className="input-text"
                                name="numberOfGroups"
                                onChange={handleChange} />
                        </label>

                    </div>

                    <div className="box-toggle-input">
                        <label>
                            Cartas
                            <input
                                type="checkbox"
                                className="input-toggle"
                                name="cards"
                                onChange={handleChange} />
                        </label>
                        <label>
                            Ajuda dos Universitários
                            <input
                                type="checkbox"
                                className="input-toggle"
                                name="studentsHelp"
                                onChange={handleChange} />
                        </label>
                        <label>
                            Ajuda da Audiência
                            <input
                                type="checkbox"
                                className="input-toggle"
                                name="audienceHelp"
                                onChange={handleChange} />
                        </label>
                        <label>
                            Pular
                            <input
                                type="checkbox"
                                className="input-toggle"
                                name="jump" 
                                onChange={handleChange}/>
                        </label>
                    </div>
                    <button type="button" onClick={($event) => handleSubmit($event)}>Salvar</button>
                </form>
            </div>

        </>
    )
}

export default CreateRoom