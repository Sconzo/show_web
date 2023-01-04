import "./style.scss";
import { useState } from "react";
import { QuestionService } from "../../services/Questions/QuestionSerivice";
import useSession, { QuestionDisplayList } from "../../zus/session";
import { useNavigate } from "react-router-dom";
import useChallenger from "../../zus/challenger";

const Challenger = () => {
  const [optionSelected, setOptionSelected] = useState(0);
  const [currentType, updateCurrentType] = useState("typeMultipleChoice");
  const [questionCount, updateQuestionCount] = useState(1);
  const [notAnswered, setNotAnswered] = useState(true);
  const [disableConfirm, setDisableConfirm] = useState(true);

  let navigate = useNavigate();
  const changeRouteToScore = () => {
    let path = `/score`;
    navigate(path);
  };

  const questionList: QuestionDisplayList = useSession(
    (state) => state.questions
  );
  const session = useSession((state) => state.session);
  const pos = useChallenger((state) => state.currentPosition);
  const challengerList = useChallenger((state) => state.challengers);
  const updateScore = useChallenger((state) => state.updateChallengerScore);
  const currentChallenger = challengerList[pos];
  const [endIndex, setEndIndex] = useState(
    session.numberOfQuestions * (pos + 1) - 1
  );
  const [activeIndex, setActiveIndex] = useState(
    session.numberOfQuestions * pos
  );

  console.log(session);
  const selectKindOfQuestionDisplay = (type: string) => {
    if (type === "MULTIPLE_CHOICE") {
      return multipleChoice();
    }
    if (type === "TRUE_OR_FALSE") {
      return trueOrFalse();
    }
    return <></>;
  };

  const multipleChoice = () => {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer1"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={() => handleClick(1)}
                htmlFor="answer1"
              >
                <span>A</span>
                {questionList[activeIndex].options[0].description}
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer2"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={() => handleClick(2)}
                htmlFor="answer2"
              >
                <span>B</span>
                {questionList[activeIndex].options[1].description}
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer3"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={($event) => handleClick(3)}
                htmlFor="answer3"
              >
                <span>C</span>
                {questionList[activeIndex].options[2].description}
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer4"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={() => handleClick(4)}
                htmlFor="answer4"
              >
                <span>D</span>
                {questionList[activeIndex].options[3].description}
              </label>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  const trueOrFalse = () => {
    return (
      <div className="options-box">
        <nav className="">
          <ul>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer1"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={() => handleClick(1)}
                htmlFor="answer1"
              >
                Verdadeiro
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="answers"
                className="invisible"
                id="answer2"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={() => handleClick(0)}
                htmlFor="answer2"
              >
                Falso
              </label>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  const handleClick = (id: number) => {
    setOptionSelected(id);
    setDisableConfirm(false);
    if (notAnswered)
      document.documentElement.style.setProperty("--color-option", "yellow");
  };

  const onChangeQuestion = (e: any) => {
    document.documentElement.style.setProperty("--color-option", "white");
    const activeIndex = parseInt(e.target.dataset.index);
    setActiveIndex(activeIndex);
    setNotAnswered(true);
    updateQuestionCount(questionCount + 1);
  };

  const handleSubmit = () => {
    QuestionService.checkCorrectAnswer(
      optionSelected,
      questionList[activeIndex].questionId
    ).then((response) => {
      if (response instanceof Error) {
        alert(response.message);
        return;
      }
      if (response) {
        document.documentElement.style.setProperty("--color-option", "green");
        currentChallenger.score = currentChallenger.score + 1;
        updateScore(pos, currentChallenger);
      } else {
        document.documentElement.style.setProperty("--color-option", "red");
      }
      console.log(response);
    });
    setNotAnswered(false);
    setDisableConfirm(true);
  };

  const endTry = () => {
    changeRouteToScore();
  };

  return (
    <>
      <div className="challenger-content">
        <div className="statement-content">
          <div className="questions-number">
            <p>{questionCount}</p>
          </div>
          <div className="question-statement">
            <p> {questionList[activeIndex].questionDescription} </p>
          </div>
        </div>
        {selectKindOfQuestionDisplay(questionList[activeIndex].type)}
        <div>
          {activeIndex < endIndex && activeIndex != endIndex && (
            <button
              disabled={notAnswered}
              onClick={onChangeQuestion}
              data-index={activeIndex + 1}
            >
              Próxima
            </button>
          )}
        </div>
        <button
          className="btn-confirm"
          disabled={disableConfirm}
          onClick={handleSubmit}
        >
          Confirmar
        </button>
        {activeIndex === endIndex && (
          <button onClick={endTry} disabled={notAnswered}>
            Finalizar
          </button>
        )}
      </div>
    </>
  );
};

export default Challenger;
