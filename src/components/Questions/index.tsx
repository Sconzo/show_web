import React from "react";
import "./style.scss";
import QuestionMaker from "../QuestionMaker";

 
class Questions extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            activeIndex : 0,
            questions:[]
        }
    }

    render() {
        return(
            <div>
                <p>TESTEEEEE</p>
                {this.state.questions.map(question => (
                    <li>                        
                        <QuestionMaker/>
                    </li>
                ))}
            </div>
            )}
    }
    


export default Questions