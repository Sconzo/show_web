import { useNavigate } from "react-router-dom";
import "./style.css";
import useSession from "../../zus/session";
import { QuestionService } from "../../services/Questions/QuestionSerivice";
import useQuestions from "../../zus/question";
import { useEffect, useState } from "react";

const HostWait = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/challenger";
    navigate(path);
  };

  const session = useSession((state) => state.session);
  const updateQuestions = useSession((state) => state.updateQuestionList);
  const sessionId = useSession((state) => state.session).sessionId;
  const questions = useQuestions((state) => state.questions);

  const [disableIniciate, setDisableIniciate] = useState(true);

  useEffect(() => {
    if (
      questions.length >=
      session.numberOfQuestions * session.numberOfChallengers
    ) {
      setDisableIniciate(false);
    } else {
      setDisableIniciate(true);
    }
  }, [questions]);

  QuestionService.getQuestionsForSession(sessionId).then((q) => {
    if (q instanceof Error) {
      alert(q.message);
      return;
    }
    updateQuestions(q);
  });

  console.log(questions);
  return (
    <div className="host-wait-content">
      <h1 className="host-wait-title">
        x/{session.numberOfGroups} grupos finalizados
      </h1>

      <div className="game-summary">
        <h2> {session.numberOfChallengers} Desafiante</h2>
        <h2> {session.numberOfQuestions} Perguntas por Desafiante</h2>
      </div>

      <button
        disabled={false}
        type="button"
        className="btn-initialize"
        onClick={routeChange}
      >
        Iniciar Jogo!!
      </button>
    </div>
  );
};

export default HostWait;
