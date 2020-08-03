import React, { Component } from 'react';
import { play } from '../config/practice';
import { anphabest } from '../config/anphabest';
import Speech from 'react-speech';
import './unit2.css';
import Header from '../headers/header';
import AuthService from '../service/AuthService ';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
class Practice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
            message: "",
            answerArr: [],
            resultArr: [],
            indexWin: 0,
            arrIndex: [],
            messageHelp: "",
            class: "",
            object: {score: 0},
            isScores: false,
            scores: 0,
            resultVoice:"",
            isDisable: false
        }
    }

    showAnswer = () =>{
        let {indexWin} = this.state;
        this.setState({messageHelp: play[indexWin].speaking, isScores: true});
        document.getElementById("finish").click();
    }

    random = (length) => {
        return Math.floor(Math.random() * length);
    }

    componentDidMount() {
        AuthService.getScores()
        .then(res=>{
            this.setState({object: res.data});
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        });
        this.startGame();
    }

    checkIndex = (index, arrIndex) => {
        let check = false;
        arrIndex.forEach(element => {
            if (element === index) check = true;
        })
        return check;
    }

    startGame = () => {
        let { arrIndex, scores } = this.state;
        let index = this.random(play.length);
        while (true) {
            if (this.checkIndex(index, arrIndex)) {
                index = this.random(play.length);
                if (arrIndex.length === play.length) {
                    let str = "End, you are the best :), your score: " + scores;
                    this.setState({
                        messageHelp: str,
                        result: "",
                        message: "",
                        answerArr: [],
                        resultArr: [],
                        indexWin: 0,
                        arrIndex: [],
                        class:"",
                        isScores: false,
                        scores: 0,
                    });
                    document.getElementById("finish").click();
                    this.startGame();
                    return;
                }
            } else break;
        }

        arrIndex.push(index);
        let arr = [];
        let arrA = [];
        for (let i = 0; i < play[index].text.length; i++) {
            arr.push("");
        }
        for (let j = 0; j < 4; j++) {
            arrA.push(anphabest[this.random(anphabest.length - 1)]);
        }
        for (let z = 0; z < play[index].text.length; z++) {
            arrA.push(play[index].text[z]);
        }
        let result = arrA.sort();
        this.setState({ answerArr: result, resultArr: arr, indexWin: index, arrIndex: arrIndex, message: "", class:"", isScores:false, resultVoice:""});
    }

    pushArr2 = (index, item) => {
        let { resultArr, answerArr } = this.state;
        let check = false;
        for (let i = 0; i < answerArr.length; i++) {
            if (answerArr[i] === "") {
                check = false;
                answerArr[i] = item;
                break;
            } else check = true;
        }
        if (!check) resultArr[index] = "";
        this.setState({ resultArr: resultArr, answerArr: answerArr, message: "", class: "" });
    }

    pushArr = (index, item) => {
        let { resultArr, answerArr } = this.state;
        let check = false;
        for (let i = 0; i < resultArr.length; i++) {
            if (resultArr[i] === "") {
                check = false;
                resultArr[i] = item;
                break;
            } else check = true;
        }
        if (!check) answerArr[index] = "";
        this.setState({ resultArr: resultArr, answerArr: answerArr, message: "", class: "" });
        if (!this.checkFull(resultArr))
            this.isWin(resultArr, 1);

    }

    checkFull = (resultArr) => {
        let check = false;
        resultArr.forEach(element => {
            if (element === "") check = true;
        })
        return check;
    }

    isWin = (res, number) => {
        let { indexWin } = this.state;
        let check = "";
        if(number === 1){
            res.forEach(element => {
                check += element;
            });
            this.checkIsWin(check, play[indexWin].text);
        }else{
            let res1 = res.toLowerCase();
            let res2 = play[indexWin].speaking.toLowerCase();
            this.checkIsWin(res1, res2);
        }
    }

    checkIsWin = (res1, res2) =>{
        let { scores, isScores, object } = this.state;
        if(res1 === res2){
            if(isScores){
                this.setState({ message: "KO Ghê :) !", class: "alert alert-success" });
            }else{
                let obj = object;
                let username = AuthService.getUserInfo().username;
                let obj2 = {
                    username: username,
                    score: obj.score,
                }
                console.log(obj);
                console.log(scores);
                if(obj.score < scores + 10){
                    obj2.score = scores + 10;
                    AuthService.pushScores(obj2).then(res=>{
                        console.log(res.data);
                    }).catch(error=>{
                        console.log(error);
                    })
                }
                this.setState({ message: "Ghê :) !",  class: "alert alert-success", scores: scores + 10 });
            }
            setTimeout(this.startGame, 2000);
        } else this.setState({ message: "Sai rồi bạn hiền :) !", class: "alert alert-danger" });
    }

    start = () =>{
        this.setState({isDisable: true, resultVoice:"", message:"", class:""});
        recognition.start();
        recognition.onstart = () => {
            console.log('Voice is actived');
        }

        recognition.onresult = (e) => {
        console.log('result');
          let current = e.resultIndex;
          let transcript = e.results[current][0].transcript;
          let mobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);
          if(!mobileRepeatBug) { 
            this.setState({resultVoice: transcript});
            this.isWin(transcript, 2);
          }
        }
        recognition.onend = () => {
            console.log('end');
            this.setState({isDisable: false});
        };
      }
    
      stop = () =>{
        recognition.onspeechend = () => {
            recognition.stop();
            console.log('voice stopped');
        }
      }

    render() {
        let { indexWin, messageHelp, arrIndex, scores, isDisable } = this.state;
        let a =<i className='fa' style={{fontSize:"24px", color:"#2196F3"}}>&#xf025;</i>;
        let text = "";
        if(isDisable){
            text = "";
        }else text = play[indexWin].speaking;
        return (
            <div className="practice">
                <Header></Header>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 border border-secondary" style={{ background: "rgb(227, 229, 236)", marginTop:"5px" }}>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "green" }}> Question : {(arrIndex.length)} / {play.length}</h6>
                            </div>
                            <div className="row">
                                <img src={play[indexWin].image} alt="res" />
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black" }}>Synonyms: <label style={{ color: "blue" }}>{play[indexWin].synonyms}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black" }}>Antonyms: <label style={{ color: "blue" }}>{play[indexWin].antonyms}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black"}}>Meanings: <label style={{ color: "red" }}>{play[indexWin].means}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <h5 style={{ color: "black" }}>Your score : <label style={{ color: "red" }}>{scores}</label></h5>
                            </div>
                            <div className="row justify-content-center" style={{marginBottom:"5px"}}>
                                <div>
                                <Speech
                                    disabled={isDisable}
                                    textAsButton={true}
                                    displayText={a}
                                    pitch={1.1} rate={0.6}
                                    lang="en-US"
                                    text={text} />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <button disabled={this.state.isDisable} type="button" className="btn-sm btn-success" onClick={this.start} >Click to voice <i className="fa fa-youtube-play" style={{fontSize:"24px"}}></i></button>
                                <button style={{marginLeft:"5px"}} type="button" className="btn-sm btn-info" onClick={this.showAnswer}>See Answer </button>
                            </div>
                            <div className="row justify-content-center">
                                    <h5>{this.state.resultVoice}</h5>
                            </div>
                            <div className="row test-bg justify-content-center" style={{ margin: "5px", padding: "2px" }}>
                                {this.state.resultArr.map((item, i) => <div key={i} className="fill"
                                    onClick={() => this.pushArr2(i, item)}>{item}</div>)}
                            </div>
                            <div className="row test-bg justify-content-center" style={{ margin: "5px", padding: "2px" }}>
                                {this.state.answerArr.map((item, i) => <div id={i} key={i} className="fill"
                                    onClick={() => this.pushArr(i, item)}>{item}</div>)}
                            </div>
                            <div className={this.state.class}>
                                {this.state.message}
                            </div>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                <button id="finish" type="button" style={{ visibility: "hidden" }} className="btn btn-primary" data-toggle="modal" data-target="#_1">
                        Open modal
                </button>
                    <div className="modal" id="_1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Message</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                <label><strong>What's up bro OMG!</strong> You will not receive points for this question!</label>
                                    <h6>Answer:</h6>
                                    <div className="alert alert-success"> 
                                        <strong>{messageHelp}!</strong>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Practice;