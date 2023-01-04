import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChallengerList,
  ChallengerService,
} from "../../services/Challengers/ChallengerService";
import useChallenger from "../../zus/challenger";
import useSession from "../../zus/session";
import { currentSessionId } from "../Management";
import "./style.css";

const challengers = [
  {
    name: "",
    id: 0,
  },
];

const Host = () => {
  const session = useSession((state) => state.session);
  const zusChallenger = useChallenger((state) => state.addChallengers);

  challengers.pop();
  const [challengerList, setChallengerList] = useState(challengers);
  const [disbledSave, setDisabledSave] = useState(true);
  const [disbledAdd, setDisabledAdd] = useState(false);
  const [challengerName, setChallengerName] = useState("");
  const [state, setState] = useState("");

  const handleInput = (event: any) => {
    setState(event.target.value);
    setChallengerName(event.target.value);
  };

  useEffect(() => {
    if (challengerList.length === session.numberOfChallengers) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }

    if (challengerList.length >= session.numberOfChallengers) {
      setDisabledAdd(true);
    } else {
      setDisabledAdd(false);
    }
  }, [challengerList]);

  const getChallenger = (event: any, challengerName: any) => {
    event.preventDefault();
    let challenger;
    if (challengerName.length > 0) {
      if (challengerList.length > 0) {
        challenger = {
          name: challengerName,
          id: challengerList[challengerList.length - 1].id + 1,
        };
      } else {
        challenger = {
          name: challengerName,
          id: 1,
        };
      }
      setChallengerList([...challengerList, challenger]);
    }
    (document.getElementById("textareaInput") as HTMLInputElement).value = "";
    setState("");
  };

  const deleteChallenger = (event: any, challenger: any) => {
    event.preventDefault();
    const data = challengerList.filter((chal) => chal.id != challenger.id);
    setChallengerList(data);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/host-wait";
    navigate(path);
  };

  const saveChallengers = (event: any, col: number) => {
    var table = document.getElementsByTagName("table")[0];
    var arr = [];
    var saveList: ChallengerList = [];
    for (let i = 0; i < table.rows.length; i++) {
      var basicObject = {
        name: "",
        score: 0,
        sessionId: session.sessionId,
        cardsLeft: 0,
        studentsHelpLeft: 0,
        skipsLeft: 0,
        audienceHelpLeft: 0,
      };
      arr.push(table.rows[i].cells[1].innerText);
      saveList.push(basicObject);
      saveList[i].name = table.rows[i].cells[1].innerText;
    }
    zusChallenger(saveList);
    ChallengerService.create(saveList);
    routeChange();
  };

  return (
    <>
      <div className="host-content">
        <form>
          <div className="input-box">
            <input
              className="input-name"
              type={"text"}
              placeholder="Ex.: Fávaro"
              id="textareaInput"
              onChange={($event) => handleInput($event)}
            />
            <button
              className="btn-add"
              disabled={disbledAdd || state === ""}
              onClick={($event) => getChallenger($event, challengerName)}
            >
              Adicionar
            </button>
          </div>
        </form>

        <h3 className="challenger-info">
          Desafiantes Adicionados {challengerList.length}/
          {session.numberOfChallengers}
        </h3>

        <div className="challenger-table">
          <table>
            <tbody>
              {challengerList.map((challenger) => (
                <tr>
                  <td>
                    <button
                      className="btn-exclude-challenger"
                      type="button"
                      onClick={($event) => deleteChallenger($event, challenger)}
                    ></button>
                  </td>
                  <td>{challenger.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn-save"
          disabled={disbledSave}
          onClick={($event) => saveChallengers($event, 1)}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default Host;
