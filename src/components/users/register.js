import React, { Component } from 'react';
import AuthService from '../service/AuthService ';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            name: "",
            message: "",
            message2: "",
            class2: "",
            role: [],
            isDisable: true,
            class: "",
            classButton:"",
            
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkPass = (e) => {
        let value = e.target.value;
        if (value !== this.state.password) this.setState({ isDisable: true, message2: "Password not match",class2: "alert alert-danger"})
        else this.setState({ isDisable: false, message2: "", class2: ""})
    }

    validateEmail = (email)=> {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    register = (e) => {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let name = this.state.name;

        const credentials = {
            username: username.trim(), password: password.trim(),
            email: email.trim(), name: name.trim(), role: ["user"]
        };

        if(!this.validateEmail(credentials.email)){
            this.setState({ message: "Email incorrect", class: "alert alert-danger" });
            return;
        }

        if (credentials.username.length < 3) {
            this.setState({ message: "Username has at least 3 characters", class: "alert alert-danger" });
            return;
        }
        if (credentials.name.length < 3) {
            this.setState({ message: "Name has at least 3 characters", class: "alert alert-danger" });
            return;
        }
        if (credentials.password.length < 6) {
            this.setState({ message: "Password has at least 6 characters", class: "alert alert-danger"});
            return;
        }
        this.setState({ isDisable:true, classButton:"spinner-border text-warning"});
        AuthService.register(credentials).then(res => {
            this.setState({ message: res.data.message, class:"alert alert-success", isDisable:false, classButton:"" });
        }).catch(err => {
            console.log(err);
            this.setState({isDisable:false, classButton:"",message: "Error System", class:"alert alert-success"});
        })

    }

    render() {
        return (
            <div className="register">
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <div className="container">
                            <div className="row text-white">
                                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                                    <h1 className="py-2 text-truncate">Register Account</h1>
                                    <div className="px-2">
                                        <form className="justify-content-center">
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Name</label>
                                                <input onChange={this.onChange} className="form-control" name="name" placeholder="Enter name" />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Email</label>
                                                <input onChange={this.onChange} className="form-control" type="email" name="email" placeholder="Enter email" />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>User name</label>
                                                <input onChange={this.onChange} className="form-control" name="username" placeholder="Enter username" />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Password</label>
                                                <input onChange={this.onChange} type="password" className="form-control" name="password" placeholder="Enter password" />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Re Password</label>
                                                <input onChange={this.checkPass} type="password" className="form-control" name="confirm password" placeholder="Confirm password" />
                                            </div>
                                            <div className={this.state.class2}>
                                               {this.state.message2}
                                            </div>
                                            <button disabled={this.state.isDisable} className="btn btn-primary btn-lg" onClick={this.register}>
                                                Register
                                                <span className={this.state.classButton}></span>
                                            </button>
                                            <div className={this.state.class}>
                                               {this.state.message}
                                            </div>
                                            <p>Already an account?<a className="nav-link" href="/">Login</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;