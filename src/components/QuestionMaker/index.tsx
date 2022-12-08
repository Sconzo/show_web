import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getQuestionById, saveQuestion } from "../../services/questionsService";



function QuestionMaker() {
  const num: number = 2

  let navigate = useNavigate();
  const routeChangeGroupLeader = () => {
    let path = "/review";
    navigate(path);
  }

  const optArray = [
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
  ]

  const initialFormData = {
    questionDescription: "",
    type:"",
    level:"",
    options:optArray,   
    sessionId:1,
  };

  const [trigger, updateTrigger] = useState("")

  const [opt, updateOpt] = useState(optArray)

  const [radio, setRadio] = useState("");

  const [optionRadio, setOptionRadio] = useState("");

  const [formData, updateFormData] = useState(initialFormData);

  const manyFunctions = (value: any, e: any) => {
    updateTrigger(value)
    setRadio(value);
    handleChange(e);
  }

  const optionManyFunctions = (value: any, e: any) => {
    setOptionRadio(value);

    let arr = opt;
    for (let k = 0; k < arr.length; k++) {
      arr[k].correctOption = false;
    }

    arr[e.target.value].correctOption = true;
    updateFormData({
      ...formData,
      ["options"]: arr
    });
  }

  const handleChange = (e: any) => {
    if (e.target.type === "radio") {
      if (e.target.value === "typeTrueOrFalse") {
        updateFormData({
          ...formData,
          ["type"]: "TRUE_OR_FALSE"
        });
      } else if (e.target.value === "typeMultipleChoice") {
        updateFormData({
          ...formData,
          ["type"]: "MULTIPLE_CHOICE"
        });
      }
    }
    else if (e.target.type === "select-one") {
      updateFormData({
        ...formData,
        ["level"]: e.target.value.trim()
      });
    }
    else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    }
  };

  const handleInputOption = (e: any) => {
    let arr = opt;
    arr[e.target.name].optionText = e.target.value;
    updateFormData({
      ...formData,
      ["options"]: arr
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData)
    const response = saveQuestion(formData);
    response.then(data => console.log(data));
    //routeChangeGroupLeader();
  }


  const multipleChoice = () => {
    return (<div className="all-options">
      <div className="option">
        <div className="option-select">
          <input
            type="radio"
            value="0"
            name="option-radio"
            onChange={(e) => optionManyFunctions(e.target.value, e)}
            checked={optionRadio === "0"}
          />
        </div>
        <div className="option-letter">
          <h1>A</h1>
        </div>
        <textarea
          onChange={(e) => handleInputOption(e)}
          className="option-textarea"
          name="0"
          rows={2}
          cols={150}>
        </textarea>

      </div>

      <div className="option">
        <div className="option-select">
          <input
            type="radio"
            value="1"
            name="option-radio"
            onChange={(e) => optionManyFunctions(e.target.value, e)}
            checked={optionRadio === "1"}
          />
        </div>
        <div className="option-letter">
          <h1>B</h1>
        </div>
        <textarea
          onChange={(e) => handleInputOption(e)}
          className="option-textarea"
          name="1"
          rows={2}
          cols={150}>
        </textarea>

      </div>

      <div className="option">
        <div className="option-select">
          <input
            type="radio"
            value="2"
            name="option-radio"
            onChange={(e) => optionManyFunctions(e.target.value, e)}

            checked={optionRadio === "2"}
          />
        </div>
        <div className="option-letter">
          <h1>C</h1>
        </div>
        <textarea
          onChange={(e) => handleInputOption(e)}
          className="option-textarea"
          name="2"
          rows={2}
          cols={150}>
        </textarea>

      </div>

      <div className="option">
        <div className="option-select">
          <input
            type="radio"
            value="3"
            name="option-radio"
            onChange={(e) => optionManyFunctions(e.target.value, e)}
            checked={optionRadio === "3"}
          />
        </div>
        <div className="option-letter">
          <h1>D</h1>
        </div>
        <textarea
          onChange={(e) => handleInputOption(e)}
          className="option-textarea"
          name="3"
          rows={2}
          cols={150}>
        </textarea>

      </div>
    </div>)
  }

  const trueOrFalse = () => {
    return (<div className="all-options">
      <div className="option">
        <div className="option-select">
          <input
            type="radio"
            value="0"
            name="option-radio"
            onChange={(e) => optionManyFunctions(e.target.value, e)}
            checked={optionRadio === "0"}
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
            onChange={(e) => optionManyFunctions(e.target.value, e)}
            checked={optionRadio === "1"}
          />
        </div>
        <div className="option-letter">
          <h1>Falso</h1>
        </div>


      </div>
    </div>)
  }

  const selectKindOfQuestionDisplay = (trigger: string) => {
    if (trigger === "typeMultipleChoice") {
      return (multipleChoice());
    }
    if (trigger === "typeTrueOrFalse") {
      return (trueOrFalse());
    }
    return (<></>)
  }

  return (
    <>
      <div className="content-maker">
        <form>
          <div className="first-line">
            <h1 className="question-tittle">Questão {num}</h1>
            <div className="toggle-inputs">
              <div className="multiple-choice-input">
                <label>Múltipla Escolha</label>
                <input
                  name="type-radio"
                  type="radio"
                  value="typeMultipleChoice"
                  onChange={(e) => manyFunctions(e.target.value, e)}
                  checked={radio === "typeMultipleChoice"}
                />

              </div>
              <div className="true-or-false-input">

                <label>Verdadeiro ou Falso</label>
                <input
                  name="type-radio"
                  type="radio"
                  value="typeTrueOrFalse"
                  onChange={(e) => manyFunctions(e.target.value, e)}
                  checked={radio === "typeTrueOrFalse"}
                />

              </div>
            </div>

            <div className="select">
              <select defaultValue={""} onChange={($event) => handleChange($event)}>
                <option >Selecione a Dificuldade</option>
                <option value="EASY">Fácil</option>
                <option value="INTERMEDIATE">Média</option>
                <option value="HARD">Difícil</option>
              </select>
            </div>
          </div>
          <div className="question-text">
            <h3 className="enum">Escreva seu enunciado aqui</h3>
            <textarea
              rows={5}
              cols={140}
              name="questionDescription"
              onChange={(e) => handleChange(e)} />
          </div>
          {selectKindOfQuestionDisplay(trigger)}
          <button
            className="btn-save"
            type="button"
            onClick={($event) => handleSubmit($event)}>Salvar</button>
        </form>
      </div>
    </>
  )
}

export default QuestionMaker