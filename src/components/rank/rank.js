import React, { Component } from 'react';
import Header from '../headers/header';
import AuthService from '../service/AuthService ';
import './rank.css';
class Rank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [{score:0, user:{name:""}}]
        }
    }

    componentDidMount() {
        AuthService.getAllScores().then(res => {
            this.setState({ result: res.data });
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let {result} = this.state;
        let arr = [];
        result.forEach(function (item, i) {
           return arr.push(
                <tr key={i}>
                {i === 0 ? (<td style={{ color: "blue" }}><img style={{ width: "100px", height: "80px" }} src={require('../../images/1st.png')} alt="test" />   {item.user.name}</td>):""}
                {i === 1 ? (<td style={{ color: "blue" }}><img style={{ width: "65px", height: "80px", marginRight:"20px", marginLeft:"14px" }} src={require('../../images/3st.jpg')} alt="test" />    {item.user.name}</td>):""}
                {i === 2 ? (<td style={{ color: "blue" }}><img style={{ width: "100px", height: "80px" }} src={require('../../images/4st.jpg')} alt="test" />   {item.user.name}</td>):""}
                {i === 3 ? (<td style={{ color: "blue" }}><img style={{ width: "100px", height: "80px" }} src={require('../../images/2st.jpg')} alt="test" />   {item.user.name}</td>):""}
                {i === 4 ? (<td style={{ color: "blue" }}><img style={{ width: "100px", height: "80px" }} src={require('../../images/5st.jpg')} alt="test" />   {item.user.name}</td>):""}
                {i > 4 ? (<td style={{ color: "blue" }}> {item.user.name}</td>):""}
                <td style={{ color: "red", paddingTop:"39px" }}>{item.score}</td>
                </tr>
            )
        })

        return (
            <div className="rank">
                <div className="container-fluid">
                    <Header></Header>
                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4 border border-secondary" style={{ marginTop: "5px" }}>
                            <h2 className="row justify-content-center" style={{ background: "rgb(227, 229, 236)", color: "green" }}>Ranked</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Scores Vocabulary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {arr}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rank;