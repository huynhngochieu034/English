import React, { Component } from 'react';
import AuthService from '../service/AuthService ';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:"",
            rePassword:"",
            isDisable: true,
            classButton:"",
            message:"",
            class:"",
            message2: "",
            class2: "",
            itemSelected:-1

        }
    }
    logout = () => {
        AuthService.logOut();
    }

    componentDidMount() {
        let check = localStorage.getItem("userInfo");
        let username = AuthService.getUserInfo();
        if (check !== null && username !== null) this.setState({ username: username.username });
    }

    onChangePass = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    checkPass = (e) => {
        let value = e.target.value;
        if (value !== this.state.password) this.setState({ isDisable: true, message2: "Password not match",class2: "alert alert-danger"})
        else this.setState({ isDisable: false, message2: "", class2: ""})
    }

    onActive = (e) =>{

    }

    changePassword = (e) => {
        e.preventDefault();
        let password = this.state.password;

        if (password.length < 6) {
            this.setState({ message: "Password has at least 6 characters", class: "alert alert-danger"});
            return;
        }

        this.setState({ isDisable:true, classButton:"spinner-border text-warning"});
        AuthService.changePassword(password).then(res => {
            this.setState({ message: res.data, class: "alert alert-success", isDisable:false, classButton:""});
        }).catch(err => {
            console.log(err);
            this.setState({ message: "Error", class: "alert alert-danger", isDisable:false, classButton:""});
        })

    }

    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://www.facebook.com/tu.ki.1029">
                                <img src={require('../../images/download.jpg')} alt="Logo" style={{ width: "50px", height: "30px" }} />
                            </a>
                        </li>
                        <li className="nav-item" name="vocabulary" >
                            <a className="nav-link" href="/vocabulary">Vocabulary</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" href="/practice">Vocabulary Practice</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice2">Grammar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice3">Reading P7</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice4">Listenning P2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice5">Listenning P1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice6">Listenning P34</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"  href="/practice7">Related Words</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/rank">Rank</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/comment">Comment</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">

                            <div className="dropdown">
                                <span style={{ color: "white" }}>Welcome, <label style={{ color: "#0099CC", padding: "5px" }}>{this.state.username}</label></span>
                                <span type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#0099CC", backgroundColor:"rgb(44, 43, 43)" }}>

                                </span>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" data-toggle="modal" data-target="#myModalPass">Change Password</button>
                                </div>
                            </div>
                        </li>
                        <div style={{ borderLeft: "1px solid white", height: "30px", marginLeft: "5px", marginRight: "5px" }} className="vl"></div>
                        <li className="nav-item">
                            <a style={{ color: "#0099CC", padding: "5px" }} className="nav-link" href="/" onClick={this.logout}><small>Sign Out</small></a>
                        </li>

                    </ul>

                </nav>

                <div className="modal" id="myModalPass">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Change Password</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="usr">New Password:</label>
                                    <input type="password" name="password" className="form-control" onChange={this.onChangePass}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Re New Password:</label>
                                    <input type="password" name="rePassword" className="form-control" onChange={this.checkPass} />
                                </div>
                                <div className={this.state.class2}>
                                    {this.state.message2}
                                </div>
                                <div className={this.state.class}>
                                    {this.state.message}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button disabled={this.state.isDisable} type="button" className="btn btn-success" onClick={this.changePassword}>Submit</button>
                                <span className={this.state.classButton}></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;