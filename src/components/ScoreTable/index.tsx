import { Challenger } from "../../services/Challengers/ChallengerService";
import useChallenger from "../../zus/challenger";
import "./style.scss";
import Confetti from "react-confetti";

const ScoreTable = () => {
  const challengerList = useChallenger((state) => state.challengers);

  const compare = (a: Challenger, b: Challenger) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  };

  challengerList.sort(compare);

  return (
    <div>
      <Confetti />
      <table className="score-table-list">
        <thead>
          <tr>
            <th>Colocação</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {challengerList.map((challenger, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{challenger.name}</td>
              <td>{challenger.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
