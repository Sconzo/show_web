import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import getQuestions from "../../zus/question";
import { QuestionService } from "../../services/Questions/QuestionSerivice";

const QuestionMakerReview = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/group-leader-wait";
        navigate(path);
    }

    const [questions, setQuestions] = useState(getQuestions(state => state.questions))
    
    const handleSubmit = () => {
        const response = QuestionService.createQuestion(questions)
        response.then(data => console.log(data));

        routeChange();
    }

    const goBack = () => {
        console.log(questions)
    }
    

    return(
        <div className="review-content">
            <h1>REVISÃO</h1>
            {questions.map(question =>(
                <div className="block-question">
                    <div className="question-header">
                        <h1 className="question-title">{question.questionDescription}</h1>
                        <h2 className="question-difficulty">{question.level}</h2>
                    </div>

                    {question.type === "MULTIPLE_CHOICE" ? (
                        <div className="option-block">                            
                            <div className={question.options[0].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"A)  " + question.options[0].optionText}
                            </h3>

                            <div className={question.options[1].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"B)  " + question.options[1].optionText}
                            </h3>

                            <div className={question.options[2].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"C)  " + question.options[2].optionText}    
                            </h3>

                            <div className={question.options[3].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"D)  " + question.options[3].optionText}
                            </h3>
                        </div>
                    ) : (
                        <div className="option-block">
                            <div className={question.options[0].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"A)  " + question.options[0].optionText}
                            </h3>

                            <div className={question.options[1].correctOption ? "circle-green" : "circle-red"}></div>
                            <h3 className="alternative">
                                {"B)  " + question.options[1].optionText}
                            </h3>
                        </div>
                    )}
                </div>
                ))}
            <button onClick={goBack}>Voltar</button>
            <button onClick={handleSubmit}>Salvar</button>
        </div>
    )
}

export default QuestionMakerReview