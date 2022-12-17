import "./style.scss"
import { useCallback, useEffect, useState } from "react";
import {QuestionList, QuestionService} from "../../services/Questions/QuestionSerivice"
import useSession, { QuestionDisplayList } from "../../zus/session";

const Challenger = () => {


  const [optionSelected, setOptionSelected] = useState(0);
  const [currentType, updateCurrentType] = useState("typeMultipleChoice")
  const [activeIndex, setActiveIndex] = useState(0)
  const [notAnswered, setNotAnswered] = useState(true)

  const selectKindOfQuestionDisplay = (type: string) => {
    if (type === "MULTIPLE_CHOICE") {
    console.log(questionList[activeIndex])
    console.log(questionList[activeIndex].options[0].description)
      return (multipleChoice());
    }
    if (type === "TRUE_OR_FALSE") {
      return (trueOrFalse());
    }
    return (<></>)
  }

  const questionList : QuestionDisplayList = useSession(state => state.questions)

  const multipleChoice = () => {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer1"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={()=>handleClick(1)}
                htmlFor='answer1'>

                <span>A</span>
                {questionList[activeIndex].options[0].description}
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer2"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={()=>handleClick(2)}
                htmlFor='answer2'>
                <span>B</span>
                {questionList[activeIndex].options[1].description}
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer3"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={($event) => handleClick(3)}
                htmlFor='answer3'>
                <span>C</span>
                {questionList[activeIndex].options[2].description}
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer4"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={()=>handleClick(4)}
                htmlFor='answer4'>
                <span>D</span>
                {questionList[activeIndex].options[3].description}
              </label>
            </li>
          </ul>
        </nav>

      </div>)
  }
  const trueOrFalse = () => {
    return (
      <div className="options-box">
        <nav className="">
          <ul>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer1"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={()=>handleClick(1)}
                htmlFor='answer1'>
                Verdadeiro
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer2"
                disabled={!notAnswered}
              />
              <label
                className="one-option"
                onClick={()=>handleClick(2)}
                htmlFor='answer2'>
                Falso
              </label>
            </li>
          </ul>
        </nav>
      </div>)
  }
  const handleClick = (id:number) => {
    setOptionSelected(id)
    if(notAnswered)
    document.documentElement.style.setProperty('--color-option', 'yellow')
  }
  
  const onChangeQuestion = (e:any) =>{
    document.documentElement.style.setProperty('--color-option', 'white')
    const activeIndex = parseInt(e.target.dataset.index)
    setActiveIndex(activeIndex)
    setNotAnswered(true)
  }
  
  const handleSubmit = () => {
    QuestionService.checkCorrectAnswer(optionSelected,questionList[activeIndex].questionId)
    .then(response => {
      if(response instanceof Error){
          alert(response.message)
          return
      }
      if(response){
        document.documentElement.style.setProperty('--color-option', 'green')
      }
      else{
        document.documentElement.style.setProperty('--color-option', 'red')
      }
      console.log(response)})
      setNotAnswered(false)
  }



  return (
    <>
      <div className="challenger-content">
        <div className="statement-content">
          <div className="questions-number">
            <p>{activeIndex + 1}</p>
          </div>
          <div className="question-statement">
            <p> {questionList[activeIndex].questionDescription} </p>
          </div>
        </div>
        {selectKindOfQuestionDisplay(questionList[activeIndex].type)}
        <div>
          {
            activeIndex < questionList.length && <button disabled={notAnswered} onClick={onChangeQuestion} data-index={activeIndex + 1}>Próxima</button>
          }
        </div>
        <button
          className="btn-confirm"
          onClick={handleSubmit}>Confirmar
        </button>
      </div>
    </>
  )
}

export default Challenger