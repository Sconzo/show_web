import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom/dist"
import Modal from "../Modal";


const roomsData = [
    {
        id: 1,
        name: "Champions",
        data: "20/12/2022",
    },
    {
        id: 2,
        name: "X-men",
        data: "01/04/2023",
    },
    {
        id: 3,
        name: "Panela FC",
        data: "15/09/2021",
    },
    {
        id: 4,
        name: "Teste",
        data: "19/04/2022",
    },
    {
        id: 5,
        name: "Boi do Piauí",
        data: "05/03/2022",
    },
    {
        id: 3,
        name: "Honda Civic",
        data: "28/08/2022",
    },
]

const Management = () => {

    const [rooms, setRooms] = useState(roomsData);

    const [trigger, setTrigger] = useState(false);

    let strSearch = "";
    const getRoomsFiltered = (event: any, strSearch: string) => {
        event.preventDefault();
        const data = roomsData.filter(room => room.name.includes(strSearch) || room.data.includes(strSearch));
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
                                    <td>{room.data}</td>
                                    <td>{room.name}</td>
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