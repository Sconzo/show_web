import { useNavigate } from "react-router-dom";
import "./style.css";
 
const optArray1 = [
    {
        optionNumber: 1,
        correctOption: false,
        optionText: "Maracujá",
    },
    {
        optionNumber: 2,
        correctOption: false,
        optionText: "Banana",
    },
    {
        optionNumber: 3,
        correctOption: true,
        optionText: "Melancia",
    },
    {
        optionNumber: 4,
        correctOption: false,
        optionText: "Abacaxi",
    },
]

const data1 = Object.freeze({
    questionNumber: 1,
    typeMultipleChoice: true,
    typeTrueOrFalse: false,
    difficulty: "EASY",
    questionStatement: "Qual dessas frutas não é amarela?",
    options : optArray1
});


const optArray2 = [
    {
        optionNumber: 1,
        correctOption: false,
        optionText: "Verdadeiro",
    },
    {
        optionNumber: 2,
        correctOption: true,
        optionText: "Falso",
    },
]

const data2 = Object.freeze({
    questionNumber: 2,
    typeMultipleChoice: false,
    typeTrueOrFalse: true,
    difficulty: "INTERMEDIATE",
    questionStatement: "A copa de 1986 deveria ter sido jogada na Colômbia, no entanto, foi sediada pela Espanha",
    options : optArray2
});

const arrayData = [data1,data2]

const QuestionMakerReview = () => {


    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/group-leader-wait";
        navigate(path);
    }
    

    return(
        <div className="review-content">
            <h1>REVISÃO</h1>
            {arrayData.map(question =>(
                <div className="block-question">
                    <div className="question-header">
                        <h1 className="question-title">{question.questionStatement}</h1>
                        <h2 className="question-difficulty">{question.difficulty}</h2>
                    </div>

                    {question.typeMultipleChoice ? (
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
            <button>Voltar</button>
            <button onClick={routeChange}>Salvar</button>
        </div>
    )
}

export default QuestionMakerReview