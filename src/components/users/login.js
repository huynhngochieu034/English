import React, { Component } from 'react';
import AuthService from '../service/AuthService ';
import './style.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
            class: "",
            isDisable: false,
            classButton: "",
            email:"",
            class2:"",
            message2:"",
            isDisable2: false,
            classButton2: "",
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        AuthService.refreshAPI();
        let check = AuthService.getUserInfo();
        if (check !== null) window.location.href = "/practice";
    }

    validateEmail = (email)=> {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    resetPassword = () =>{
        let email = this.state.email;
        let check = this.validateEmail(email);

        this.setState({ isDisable2: true, classButton2: "spinner-border text-warning" });

        if(check){
            AuthService.resetPassword(email).then(res=>{
                this.setState({ message2: res.data, class2: "alert alert-success", isDisable2:false, classButton2:""});
            }).catch(err => {
                console.log(err);
                this.setState({ message2: "Error system", class2: "alert alert-danger", isDisable2: false, classButton2: "" });
            })
        }else{
            this.setState({ message2: "Email incorrect", class2: "alert alert-danger", isDisable2: false, classButton2: "" });
        }
    
    }

    handleLogin = (e) => {
        let { username, password } = this.state;
        e.preventDefault();

        const credentials = { username: this.state.username, password: this.state.password };
        if (username.length < 3) {
            this.setState({ message: "Username has at least 3 characters", class: "alert alert-danger" });
            return;
        }
        if (password.length < 6) {
            this.setState({ message: "Password has at least 6 characters", class: "alert alert-danger" });
            return;
        }
        this.setState({ isDisable: true, classButton: "spinner-border text-warning" });
        AuthService.handleLogin(credentials).then(res => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.props.history.push('/vocabulary');
        }).catch(err => {
            console.log(err);
            this.setState({ message: "Wrong username and password", class: "alert alert-danger", isDisable: false, classButton: "" });
        })
    }

    render() {
        return (
            <div className="login">
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <div className="container">
                            <div className="row text-white">
                                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                                    <h1 className="py-2 text-truncate">English App</h1>
                                    <div className="px-2">
                                        <form className="justify-content-center">
                                            <div className="form-group">
                                                <label className="sr-only">Name</label>
                                                <input onChange={this.onChange} type="text" className="form-control" name="username" placeholder="Enter username" />
                                            </div>
                                            <div className="form-group">
                                                <label className="sr-only">Email</label>
                                                <input onChange={this.onChange} type="password" className="form-control" name="password" placeholder="Enter password" />
                                            </div>
                                            <button disabled={this.state.isDisable} className="btn btn-primary btn-lg" onClick={this.handleLogin}>
                                                Login
                                                <span className={this.state.classButton}></span>
                                            </button>

                                            <div className={this.state.class}>
                                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                                {this.state.message}
                                            </div>
                                            <label>Don't have an account? <a className="nav-link" href="/register">Register</a> </label>
                                            
                                            
                                        </form>
                                        <button className="btn-sm btn-primary" data-toggle="modal" data-target="#myModalRePass" >Forgot Password?</button>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal" id="myModalRePass">
                                            <div className="modal-dialog">
                                                <div className="modal-content">

                                                    <div className="modal-header">
                                                        <h4 className="modal-title">Get Password</h4>
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    </div>

                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <label htmlFor="usr">Email:</label>
                                                            <input type="email" name="email" className="form-control" onChange={this.onChange} />
                                                        </div>
                                                       
                                                        <div className={this.state.class2}>
                                                            {this.state.message2}
                                                        </div>
                                                       
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button disabled={this.state.isDisable2} type="button" className="btn btn-success" onClick={this.resetPassword}>Get Pass</button>
                                                        <span className={this.state.classButton2}></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
            </div>
        );
    }
}

export default Login;