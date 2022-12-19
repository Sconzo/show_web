import { useState, useEffect, useContext } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom/dist";
import Modal from "../Modal";
import { Room, RoomsService } from "../../services/Rooms/RommsService";
import { RoomList } from "../../services/Rooms/RommsService";
import useSession from "../../zus/session";

const roomsData: RoomList = [];

export const currentSessionId = 0;

const Management = () => {
  const [allRooms, setAllRooms] = useState(roomsData);
  const [rooms, setRooms] = useState(roomsData);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    RoomsService.getAll().then((response) => {
      if (response instanceof Error) {
        alert(response.message);
        return;
      }
      setRooms(response);
      setAllRooms(response);
    });
  }, []);

  const getRoomsFiltered = (event: any, strSearch: string) => {
    event.preventDefault();
    const data = allRooms.filter(
      (room) =>
        room.sessionName.toLowerCase().includes(strSearch.toLowerCase()) ||
        room.createdIn.includes(strSearch)
    );

    setRooms(data);
  };
  let strSearch = "";
  const handleInput = (event: any) => {
    strSearch = event.target.value;
  };

  const changeSession = useSession((state) => state.changeSession);
  const showModal = (session: Room) => {
    console.log(session);
    changeSession(session);
    console.log(session);
    setTrigger(true);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `create-room`;
    navigate(path);
  };
  const routeChangeGroupLeader = () => {
    let path = "/group-leader";
    navigate(path);
  };
  const routeChangeHost = () => {
    let path = "/host";
    navigate(path);
  };

  function showOnlyDate(createdIn: string): import("react").ReactNode {
    let date = createdIn.slice(0, 10);
    return date;
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
            <button onClick={($event) => getRoomsFiltered($event, strSearch)}>
              Buscar
            </button>
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
              {rooms.map((room) => (
                <tr>
                  <td>{showOnlyDate(room.createdIn)}</td>
                  <td>{room.sessionName}</td>
                  <td>
                    <button
                      className="join-button"
                      type="button"
                      onClick={() => showModal(room)}
                    >
                      Entrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          trigger={trigger}
          setTrigger={setTrigger}
          modalText="Como deseja entrar?"
        >
          <div>
            <button className="modal-btn" onClick={routeChangeGroupLeader}>
              Líder de Grupo
            </button>
            <button className="modal-btn" onClick={routeChangeHost}>
              Anfitrião
            </button>
          </div>
        </Modal>
        <button
          className="create-room-button"
          type="button"
          onClick={routeChange}
        >
          Criar Sala
        </button>
      </div>
    </>
  );
};

export default Management;
