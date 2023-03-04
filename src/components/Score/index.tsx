import { useNavigate } from "react-router-dom";
import useChallenger from "../../zus/challenger";
import useSession from "../../zus/session";
import "./style.scss";

const Score = () => {
  const session = useSession((state) => state.session);
  const challengers = useChallenger((state) => state.challengers);

  const pos = useChallenger((state) => state.currentPosition);
  const currentChallenger = challengers[pos];
  const increaseChallengerPosition = useChallenger(
    (state) => state.increaseChallengerPosition
  );

  let navigate = useNavigate();
  const changeRouteBack = () => {
    increaseChallengerPosition(pos);
    let path = `/challenger`;
    navigate(path);
  };
  const goToScoreTable = () => {
    let path = `/score-table`;
    navigate(path);
  };

  let greetingMessage = "";
  let details = "";
  console.log(currentChallenger.score);

  if (currentChallenger.score > 0) {
    greetingMessage = "Parabéns " + currentChallenger.name;
    if (currentChallenger.score == 1) {
      details = "Você acertou " + currentChallenger.score + " questão";
    } else {
      details = "Você acertou " + currentChallenger.score + " questões";
    }
  } else {
    greetingMessage = "Que pena " + currentChallenger.name;
    details = "Você não acertou nenhuma questão ";
  }

  return (
    <div className="score-content">
      <div className="title-score">
        <p>{greetingMessage}</p>
      </div>
      <div className="score-details">
        <p>{details}</p>
      </div>

      {pos < session.numberOfChallengers - 1 && (
        <button className="btn-end-challenger" onClick={changeRouteBack}>
          Vamos {challengers[pos + 1].name}
        </button>
      )}

      {pos >= session.numberOfChallengers - 1 && (
        <button className="btn-end-challenger" onClick={goToScoreTable}>
          Ver Resultado
        </button>
      )}
    </div>
  );
};

export default Score;
