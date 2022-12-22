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

  console.log(currentChallenger);
  return (
    <div className="score-content">
      <span>
        PARABÉNS {currentChallenger.name}! Você acertou:{" "}
        {currentChallenger.score} questões
      </span>

      <button
        onClick={changeRouteBack}
        disabled={pos >= session.numberOfChallengers - 1}
      >
        Próximo Desafiante
      </button>
    </div>
  );
};

export default Score;
