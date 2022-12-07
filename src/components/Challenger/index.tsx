import "./style.scss"
import { useState } from "react";

const Challenger = () => {

  const [wasClicked, setWasClicked] = useState(true);
  const [trigger, updateTrigger] = useState("typeMultipleChoice")

  const selectKindOfQuestionDisplay = (trigger: string) => {
    if (trigger === "typeMultipleChoice") {
      return (multipleChoice());
    }
    if (trigger === "typeTrueOrFalse") {
      return (trueOrFalse());
    }
    return (<></>)
  }

  const multipleChoice2 = () => {
    return (
      <div className="options-box">
        <div
          className="one-option"
          style={{
            backgroundColor: wasClicked ? '#FFE600' : '',
          }}
          onClick={handleClick}>
          <div>
            <p>A</p>
          </div>
          <p>UMM</p>
        </div>
        <div className="one-option">
          <div>
            <p>B</p>
          </div>
          <p>DOSSISDOSSISDOSSISDOSSISDOS SISDOSSISDOSSISDOSSISDOSSISDOSSI SDOSSISDOSSISDOSSI SDOSSISDOSSISDOSSISDOSSISD OSSISDOSSISDOSSISDOSSISDOSSISDOSSISDOSSIS</p>
        </div>
        <div className="one-option">
          <div>
            <p>C</p>
          </div>
          <p>TES</p>
        </div>
        <div className="one-option">
          <div>
            <p>D</p>
          </div>
          <p>QUAR</p>
        </div>
      </div>
    )
  }

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
              />
              <label
                className="one-option"
                onClick={handleClick}
                htmlFor='answer1'>

                <span>A</span>

                AAAAAAalkdf klaAAA

              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer2"
              />
              <label
                className="one-option"
                onClick={handleClick}
                htmlFor='answer2'>
                <span>B</span>
                d flaslkend
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer3"
              />
              <label
                className="one-option"
                onClick={($event) => handleClick()}
                htmlFor='answer3'>
                <span>C</span>
                f dmslnflknsd
              </label>
            </li>
            <li>
              <input
                type='radio'
                name="answers"
                className="invisible"
                id="answer4"
              />
              <label
                className="one-option"
                onClick={handleClick}
                htmlFor='answer4'>
                <span>D</span>
                ndnalkfal
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
              />
              <label
                className="one-option"
                onClick={handleClick}
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
              />
              <label
                className="one-option"
                onClick={handleClick}
                htmlFor='answer2'>
                Falso
              </label>
            </li>
          </ul>
        </nav>
      </div>)
  }


  const handleClick = () => {
  }

  return (
    <>
      <div className="challenger-content">
        <div className="statement-content">
          <div className="questions-number">
            <p>1</p>
          </div>
          <div className="question-statement">
            <p> Texto </p>
          </div>
        </div>
        {selectKindOfQuestionDisplay(trigger)}
        <button
          className="btn-confirm">Confirmar</button>

      </div>
    </>
  )
}

export default Challenger