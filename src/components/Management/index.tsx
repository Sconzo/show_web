import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom/dist"
import Modal from "../Modal";
import axios, { AxiosResponse } from "axios";
import { RoomsService } from "../../services/Rooms/RommsService";
import { RoomList } from "../../services/Rooms/RommsService";

const roomsData : RoomList = [
    {
        sessionId: 0,
        sessionName: "",
        createdIn: "",
    }
]

const Management = () => {

    const [rooms, setRooms] = useState(roomsData);

    const [trigger, setTrigger] = useState(false);

    
    useEffect(() => {
        RoomsService.getAll()
        .then(response => {
            if(response instanceof Error){
                alert(response.message)
                return
            }
            setRooms(response)})
      }, []);

    let strSearch = "";
    const getRoomsFiltered = (event: any, strSearch: string) => {
        event.preventDefault();
        const data = roomsData.filter(room => room.sessionName.includes(strSearch) || room.createdIn.includes(strSearch));
        setRooms(data);
    };

    const handleInput = (event: any) => {
        strSearch = event.target.value;
    };

    
    const showModal = () =>{
        setTrigger(true);
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `create-room`;
        navigate(path);
    }
    const routeChangeGroupLeader = () => {
        let path = "/group-leader";
        navigate(path);
    }
    const routeChangeHost = () => {
        let path = "/host";
        navigate(path);
    }

    if(!rooms) return null;
    
    return (
        <>
            <div className="management-content">
                <div className="searchBox">
                    <form action="">
                        <input
                            type={"text"}
                            placeholder="Ex.: Sala Champions"
                            onChange={() => handleInput(event)}
                        />
                        <button onClick={($event) => getRoomsFiltered($event, strSearch)}>Buscar</button>
                    </form>
                </div>
                <div className="rooms-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nome da Sala</th>
                                <th>Entrar na Sala</th>
                            </tr>

                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr>
                                    <td>{room.createdIn}</td>
                                    <td>{room.sessionName}</td>
                                    <td>
                                        <button 
                                            className="join-button" 
                                            type="button"
                                            onClick={showModal}>Entrar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    
                </div>
                <Modal trigger={trigger} setTrigger={setTrigger} modalText="Como deseja entrar?">
                    <div>
                        <button className="modal-btn" onClick={routeChangeGroupLeader}>Líder de Grupo</button>
                        <button className="modal-btn" onClick={routeChangeHost}>Anfitrião</button>
                    </div>
                </Modal>           
                <button
                    className="create-room-button"
                    type="button"
                    onClick={routeChange}>Criar Sala</button>
            </div>
        </>
    );
}

export default Management