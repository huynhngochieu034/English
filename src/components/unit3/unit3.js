import React, { Component } from 'react';
import Header from '../headers/header';
import { grammar } from '../config/grammar';
import './unit3.css';

class Practice2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: [],
            answer: [],
            arrAnswer: [],
            isDisable: true,
            isSubmit: false,
            indexList: [0, 1, 2, 3, 4, 5],
            bai: "Bài 1"
        }
    }

    setList = (index1, index2) => {
        let arr = [];
        let { bai } = this.state;
        if (index2 === 5) {
            bai = "Bài 1";
        }
        else if (index2 === 11) {
            bai = "Bài 2";
        }
        else if (index2 === 17) {
            bai = "Bài 3";
        }
        else if (index2 === 23) {
            bai = "Bài 4";
        }
        else if (index2 === 29) {
            bai = "Bài 5";
        }
        
        if (grammar.length < index2) {
            for (let i = 0; i <= 4; i++) {
                arr.push(i);
            }
            bai = "Bài 1";
        } else {
            for (let i = index1; i <= index2; i++) {
                arr.push(i);
            }
        }
        this.setState({ indexList: arr, arrAnswer: [], answer: [], question: [], bai: bai }, () => {
            this.startGame(arr);
        });
    }

    pushQuestion = (item, i) => {
        let { arrAnswer, answer } = this.state;
        for (let i = 0; i < arrAnswer.length; i++) {
            if (arrAnswer[i] === "") {
                arrAnswer[i] = item;
                break;
            }
        }
        answer.splice(i, 1);
        if (answer.length === 0) this.setState({ isDisable: false });
        this.setState({ arrAnswer: arrAnswer, answer: answer, isSubmit: false });
    }

    pushAnswer = (item, i) => {
        let { arrAnswer, answer } = this.state;
        if (arrAnswer[i] !== "")
            answer.push(arrAnswer[i]);
        arrAnswer[i] = "";
        if (answer.length > 0) this.setState({ isDisable: true });
        this.setState({ answer: answer, arrAnswer: arrAnswer, isSubmit: false });
    }

    startGame = (arr) => {
        let { answer, question, arrAnswer } = this.state;
        for (let i = 0; i < arr.length; i++) {
            answer.push(grammar[arr[i]].result);
            arrAnswer.push("");
        }
        for (let i = 0; i < arr.length; i++) {
            question.push(grammar[arr[i]].question);
        }
        answer.sort();
        this.setState({ answer: answer, question: question, isSubmit: false });

    }

    result = () => {
        let { arrAnswer, indexList } = this.state;
        let check = false;
        for (let i = 0; i < arrAnswer.length; i++) {
            if (grammar[indexList[i]].result !== arrAnswer[i]) {
                check = true;
            }
        }
        this.setState({ isSubmit: true });
        if (check) {
            //alert("Wrong!");
        } else {
            alert("Good!");
            if (indexList[indexList.length - 1] === 24)
                this.setList(indexList[indexList.length - 1] + 1, indexList[indexList.length - 1] + 4);
            else
                this.setList(indexList[indexList.length - 1] + 1, indexList[indexList.length - 1] + 5);
        };
    }

    componentDidMount() {
        let { indexList } = this.state;
        this.startGame(indexList);
    }

    render() {
        let { arrAnswer, indexList, isDisable, question, isSubmit } = this.state;
        let labelOk = <i className="fa fa-check-circle" style={{ fontSize: "24px", color: "green" }}></i>;
        let labelWrong = <i className="fa fa-times-circle" style={{ fontSize: "24px", color: "red" }}></i>;
        let arr = [];
        for (let i = 0; i < question.length; i++) {
            if (isSubmit) {
                if (grammar[indexList[i]].result === arrAnswer[i]) {
                    arr.push(labelOk);
                } else {
                    arr.push(labelWrong);
                }
            }
        }
        return (
            <div className="practice2">
                <Header></Header>
                <div className="container">
                    <h4 className="justify-content-center">Grammar + Vocabulary</h4>


                    <h4 className="modal-title">{this.state.bai}</h4>

                    <div style={{ marginTop: "5px" }}>
                        <h4 style={{ textAlign: "center", background: "rgb(204, 212, 223)", color: "blue"}}>Question</h4>
                        <hr></hr>
                        <div className="row">
                            {this.state.question.map((item, i) => <div style={{whiteSpace: "pre-line"}} id={i} key={i} className="col-sm-4 card" onClick={() => this.pushAnswer(item, i)}
                            ><strong>{i + 1}</strong>  {item} <label className={this.state.arrAnswer[i] ? "answer" : ""}>{this.state.arrAnswer[i]}</label><label>{arr[i]}</label></div>)}
                        </div>
                        <hr></hr>
                        <h4 className="" style={{ textAlign: "center", background: "rgb(204, 212, 223)", color: "#0099CC"}}>Answer</h4>
                        <hr></hr>
                        <div className="row">
                            {this.state.answer.map((item, i) => <label style={{whiteSpace: "pre-line"}} id={i} key={i} className="answer" onClick={() => this.pushQuestion(item, i)}
                            >{item}</label>)}
                        </div>

                    </div>
                    <ul style={{ marginTop: "20px" }} className="pagination justify-content-center">
                        <li className="page-item">
                            <label className="page-link labelLink" onClick={() => this.setList(0, 5)}><u>Bài 1</u></label>
                        </li>
                        <li className="page-item">
                            <label className="page-link labelLink" onClick={() => this.setList(6, 11)}><u>Bài 2</u></label>
                        </li>
                        <li className="page-item">
                            <label className="page-link labelLink" onClick={() => this.setList(12, 17)}><u>Bài 3</u></label>
                        </li>
                        <li className="page-item">
                            <label className="page-link labelLink" onClick={() => this.setList(16, 23)}><u>Bài 4</u></label>
                        </li>
                        <li className="page-item">
                            <label className="page-link labelLink" onClick={() => this.setList(24, 29)}><u>Bài 5</u></label>
                        </li>
                    </ul>
                    <div className="modal-footer">
                        <button disabled={isDisable} type="button" onClick={this.result} className="btn btn-primary">Submit</button>
                    </div>
                </div>

            </div>

        );
    }
}

export default Practice2;