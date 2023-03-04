import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getQuestionById, saveQuestion } from "../../services/questionsService";
import {
  optArrayType,
  QuestionService,
} from "../../services/Questions/QuestionSerivice";
import useSession from "../../zus/session";
import useQuestions from "../../zus/question";
import { Enviroment } from "../../enviroment";

function QuestionMaker() {
  let navigate = useNavigate();
  const routeChangeGroupLeader = () => {
    let path = "/review";
    navigate(path);
  };

  const optArray: optArrayType = [
    {
      optionNumber: 1,
      correctOption: false,
      optionText: "",
    },
    {
      optionNumber: 2,
      correctOption: false,
      optionText: "",
    },
    {
      optionNumber: 3,
      correctOption: false,
      optionText: "",
    },
    {
      optionNumber: 4,
      correctOption: false,
      optionText: "",
    },
  ];

  const initialFormData = {
    questionDescription: "",
    type: "",
    level: "",
    options: optArray,
    sessionId: 0,
  };

  const session = useSession((state) => state.session);
  const addQuestion = useQuestions((state) => state.addQuestion);
  const updateQuestion = useQuestions((state) => state.updateQuestion);
  const questions = useQuestions((state) => state.questions);

  const [trigger, updateTrigger] = useState(() => {
    if (questions[0] === undefined) {
      return "";
    } else {
      return questions[0].type;
    }
  });

  const [opt, updateOpt] = useState(optArray);
  const [formData, updateFormData] = useState(initialFormData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [state, setState] = useState(() => {
    if (questions[0] === undefined) {
      return {
        level: "",
        type: "",
        description: "",
        optTF: "",
        optMC: "",
        options: optArray,
      };
    } else {
      var tf = "";
      var mc = "";
      ({ mc, tf } = getMCandTF(questions[0], mc, tf));
      return {
        level: questions[0].level,
        type: questions[0].type,
        description: questions[0].questionDescription,
        optTF: tf,
        optMC: mc,
        options: questions[0].options,
      };
    }
  });
  const [disableChangePage, setDisableChangePage] = useState(true);
  useEffect(() => {
    checkIfMayChangePage();
  }, [state]);

  const checkIfMayChangePage = () => {
    if (
      state.description != "" &&
      state.level != "" &&
      state.level != "Selecione a Dificuldade" &&
      state.type != ""
    ) {
      if (state.type === Enviroment.MULTIPLE_CHOICE) {
        var hasTrue = false;
        var hasOptions = 0;
        state.options.forEach((item) => {
          if (item.correctOption) {
            hasTrue = item.correctOption;
          }
          if (item.optionText !== "") {
            hasOptions = hasOptions + 1;
          }
        });
        if (hasTrue && hasOptions === 4) {
          setDisableChangePage(false);
        } else {
          setDisableChangePage(true);
        }
      } else if (state.type === Enviroment.TRUE_OR_FALSE) {
        if (state.options[0].correctOption || state.options[1].correctOption) {
          setDisableChangePage(false);
        } else {
          setDisableChangePage(true);
        }
      }
    } else {
      setDisableChangePage(true);
    }
  };

  const handleChangeType = (value: any, e: any) => {
    updateTrigger(value);
    setState({ ...state, ["type"]: value, ["optTF"]: "", ["optMC"]: "" });

    let arr = opt;
    for (let k = 0; k < arr.length; k++) {
      arr[k].correctOption = false;
    }
    updateFormData({
      ...formData,
      ["options"]: arr,
    });

    if (e.target.value === Enviroment.TRUE_OR_FALSE) {
      updateFormData({
        ...formData,
        ["type"]: Enviroment.TRUE_OR_FALSE,
      });
    } else if (e.target.value === Enviroment.MULTIPLE_CHOICE) {
      updateFormData({
        ...formData,
        ["type"]: Enviroment.MULTIPLE_CHOICE,
      });
    }
  };

  const handleChangeSelect = (e: any) => {
    setState({ ...state, ["level"]: e.target.value.trim() });

    updateFormData({
      ...formData,
      ["level"]: e.target.value.trim(),
    });
  };

  const handleChangeTFInput = (value: any, e: any) => {
    setState({ ...state, ["optTF"]: value });

    let arr = opt;
    for (let k = 0; k < arr.length; k++) {
      arr[k].correctOption = false;
    }
    arr[e.target.value].correctOption = true;
    updateFormData({
      ...formData,
      ["options"]: arr,
    });
  };

  const handleChangeMCInput = (value: any, e: any) => {
    setState({ ...state, ["optMC"]: value });
    let arr = opt;
    for (let k = 0; k < arr.length; k++) {
      arr[k].correctOption = false;
    }
    arr[e.target.value].correctOption = true;
    updateFormData({
      ...formData,
      ["options"]: arr,
    });
  };

  const handleChangeDescription = (e: any) => {
    setState({ ...state, ["description"]: e.target.value });

    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ["sessionId"]: session.sessionId,
    });
  };

  const handleInputOption = (e: any) => {
    let arr = opt;
    arr[e.target.name].optionText = e.target.value;
    updateFormData({
      ...formData,
      ["options"]: arr,
    });
    setState({ ...state, ["options"]: arr });
  };

  const changeQuestion = (currentPage: number, e: any) => {
    e.preventDefault();

    if (questions[activeIndex] === undefined) {
      updateOpt(optArray);
      updateTrigger("");
      setState({
        level: "",
        type: "",
        description: "",
        optTF: "",
        optMC: "",
        options: optArray,
      });
      addQuestion(formData);
      updateFormData(initialFormData);
    } else {
      var q = formData;
      q.questionDescription = state.description;
      q.type = state.type;
      q.level = state.level;
      q.sessionId = session.sessionId;

      if (state.type == Enviroment.MULTIPLE_CHOICE) {
        q.options = state.options;
      } else if (state.type == Enviroment.TRUE_OR_FALSE) {
        if (state.optTF === "0") {
          q.options[0].correctOption = true;
          q.options[1].correctOption = false;
        }
        if (state.optTF === "1") {
          q.options[0].correctOption = false;
          q.options[1].correctOption = true;
        }
      }
      updateQuestion(activeIndex, formData);
      updateFormData(initialFormData);
    }

    if (questions[activeIndex + currentPage] !== undefined) {
      var q = questions[activeIndex + currentPage];
      let mc = "";
      let tf = "";
      ({ mc, tf } = getMCandTF(q, mc, tf));
      updateOpt(q.options);
      updateTrigger(q.type);
      setState({
        level: q.level,
        type: q.type,
        description: q.questionDescription,
        optTF: tf,
        optMC: mc,
        options: q.options,
      });

      updateFormData(initialFormData);
    } else {
      updateTrigger("");
      updateOpt(optArray);
      setState({
        level: "",
        type: "",
        description: "",
        optTF: "",
        optMC: "",
        options: optArray,
      });
    }
    const index = parseInt(e.target.dataset.index);
    setActiveIndex(index);
  };
  const handleSubmit = (e: any) => {
    changeQuestion(1, e);

    e.preventDefault();

    routeChangeGroupLeader();
  };

  const multipleChoice = () => {
    return (
      <div className="all-options">
        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="0"
              name="option-radio"
              onChange={(e) => handleChangeMCInput(e.target.value, e)}
              checked={state.optMC === "0"}
            />
          </div>
          <div className="option-letter">
            <h1>A</h1>
          </div>
          <textarea
            onChange={(e) => handleInputOption(e)}
            value={state.options[0].optionText}
            className="option-textarea"
            name="0"
            rows={2}
            cols={150}
          ></textarea>
        </div>

        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="1"
              name="option-radio"
              onChange={(e) => handleChangeMCInput(e.target.value, e)}
              checked={state.optMC === "1"}
            />
          </div>
          <div className="option-letter">
            <h1>B</h1>
          </div>
          <textarea
            onChange={(e) => handleInputOption(e)}
            value={state.options[1].optionText}
            className="option-textarea"
            name="1"
            rows={2}
            cols={150}
          ></textarea>
        </div>

        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="2"
              name="option-radio"
              onChange={(e) => handleChangeMCInput(e.target.value, e)}
              checked={state.optMC === "2"}
            />
          </div>
          <div className="option-letter">
            <h1>C</h1>
          </div>
          <textarea
            onChange={(e) => handleInputOption(e)}
            className="option-textarea"
            value={state.options[2].optionText}
            name="2"
            rows={2}
            cols={150}
          ></textarea>
        </div>

        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="3"
              name="option-radio"
              onChange={(e) => handleChangeMCInput(e.target.value, e)}
              checked={state.optMC === "3"}
            />
          </div>
          <div className="option-letter">
            <h1>D</h1>
          </div>
          <textarea
            onChange={(e) => handleInputOption(e)}
            className="option-textarea"
            name="3"
            value={state.options[3].optionText}
            rows={2}
            cols={150}
          ></textarea>
        </div>
      </div>
    );
  };

  const trueOrFalse = () => {
    return (
      <div className="all-options">
        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="0"
              name="option-radio"
              onChange={(e) => handleChangeTFInput(e.target.value, e)}
              checked={state.optTF === "0"}
            />
          </div>
          <div className="option-letter">
            <h1>Verdadeiro</h1>
          </div>
        </div>

        <div className="option">
          <div className="option-select">
            <input
              type="radio"
              value="1"
              name="option-radio"
              onChange={(e) => handleChangeTFInput(e.target.value, e)}
              checked={state.optTF === "1"}
            />
          </div>
          <div className="option-letter">
            <h1>Falso</h1>
          </div>
        </div>
      </div>
    );
  };

  const selectKindOfQuestionDisplay = (trigger: string) => {
    if (trigger === Enviroment.MULTIPLE_CHOICE) {
      return multipleChoice();
    }
    if (trigger === Enviroment.TRUE_OR_FALSE) {
      return trueOrFalse();
    }
    return <></>;
  };

  const numberOfQuestionsPerGroup =
    (session.numberOfQuestions * session.numberOfChallengers) /
    session.numberOfGroups;

  return (
    <>
      <div className="content-maker">
        <form>
          <div className="first-line">
            <h1 className="question-tittle">
              Questão {activeIndex + 1}/{numberOfQuestionsPerGroup}
            </h1>
            <div className="toggle-inputs">
              <div className="multiple-choice-input">
                <label>Múltipla Escolha</label>
                <input
                  name="type-radio"
                  type="radio"
                  value={Enviroment.MULTIPLE_CHOICE}
                  onChange={(e) => handleChangeType(e.target.value, e)}
                  checked={state.type === Enviroment.MULTIPLE_CHOICE}
                />
              </div>
              <div className="true-or-false-input">
                <label>Verdadeiro ou Falso</label>
                <input
                  name="type-radio"
                  type="radio"
                  value={Enviroment.TRUE_OR_FALSE}
                  onChange={(e) => handleChangeType(e.target.value, e)}
                  checked={state.type === Enviroment.TRUE_OR_FALSE}
                />
              </div>
            </div>

            <div className="select">
              <select
                defaultValue={""}
                value={state.level}
                onChange={($event) => handleChangeSelect($event)}
              >
                <option>Selecione a Dificuldade</option>
                <option value="EASY">Fácil</option>
                <option value="INTERMEDIATE">Média</option>
                <option value="HARD">Difícil</option>
              </select>
            </div>
          </div>
          <div className="question-text">
            <h3 className="enum">Escreva seu enunciado aqui</h3>
            <textarea
              value={state.description}
              rows={5}
              cols={140}
              name="questionDescription"
              onChange={(e) => handleChangeDescription(e)}
            />
          </div>
          {selectKindOfQuestionDisplay(trigger)}

          <div>
            {activeIndex > 0 && (
              <button
                disabled={disableChangePage}
                onClick={($event) => changeQuestion(-1, event)}
                data-index={activeIndex - 1}
              >
                Anterior
              </button>
            )}
            {activeIndex < numberOfQuestionsPerGroup - 1 && (
              <button
                disabled={disableChangePage}
                onClick={($event) => changeQuestion(1, event)}
                data-index={activeIndex + 1}
              >
                Próxima
              </button>
            )}
          </div>
          {activeIndex === numberOfQuestionsPerGroup - 1 && (
            <button
              disabled={disableChangePage}
              className="btn-save"
              type="button"
              onClick={($event) => handleSubmit($event)}
            >
              Revisar
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default QuestionMaker;

function getMCandTF(
  q: {
    questionDescription: string;
    type: string;
    level: string;
    options: optArrayType;
    sessionId: number;
  },
  mc: string,
  tf: string
) {
  if (q.type === Enviroment.MULTIPLE_CHOICE) {
    q.options.forEach((item) => {
      if (item.correctOption) {
        mc = String(item.optionNumber - 1);
      }
    });
  } else if (q.type === Enviroment.TRUE_OR_FALSE) {
    if (q.options[0].correctOption) {
      tf = "0";
    } else if (q.options[1].correctOption) {
      tf = "1";
    }
  }
  return { mc, tf };
}
