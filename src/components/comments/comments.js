import React, { Component } from 'react';
import Header from '../headers/header';
import './comment.css';
import AuthService from '../service/AuthService ';
class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment:"",
            isDisable:true,
            message:"",
            classButton:"",
            class:"",
            arr: []
        }
    }

    componentDidMount(){
        this.resetComment();
    }

    resetComment = () =>{
        AuthService.getComment().then(res=>{
            this.setState({arr: res.data});
        }).catch(err=>{
            console.log(err);
        })
    }

    onChange = (event)=>{
        let ct = event.target.value;
        if(ct.trim() === ""){
            this.setState({ isDisable: true })
        }else{
            this.setState({ comment: event.target.value, isDisable: false });
        }
        
    }

    deleteComment = (id)=>{
        this.setState({ isDisable:true, classButton:"spinner-border text-warning"});
        AuthService.deleteComment(id).then(res =>{
            this.setState({ message: res.data, class: "alert alert-success", isDisable:false, classButton:""});
            this.resetComment();
        }).catch(err => {
            console.log(err);
            this.setState({ message: "Delete Success !", class: "alert alert-success", isDisable:false, classButton:""});
            this.resetComment();
        })
    }



    onSubmit = () =>{
        let currentdate = new Date();
        let day = currentdate.getDate();
        let month = currentdate.getMonth();
        let year = currentdate.getFullYear();
        let hour = currentdate.getHours();
        let minute = currentdate.getMinutes();
        let second = currentdate.getSeconds();

        let object = {
            content: this.state.comment,
            dateTime: year +"-"+month+"-"+day+" "+hour+":"+minute+":"+second,
            username: AuthService.getUserInfo().username,
        }
        this.setState({ isDisable:true, classButton:"spinner-border text-warning"});
        AuthService.postComment(object).then(res =>{
            this.setState({ message: res.data, class: "alert alert-success", isDisable:false, classButton:""});
            this.resetComment();
        
        }).catch(err => {
            console.log(err);
            this.setState({ message: "Error", class: "alert alert-danger", isDisable:false, classButton:""});
            this.resetComment();
           
        })

        
    }

    render() {
        let username = AuthService.getUserInfo().username;
        return (
            <div className="practice2">
                <Header></Header>
                <div className="container">
                    <div className="form-group">

                        <h5>Comments</h5>
                        <div className={this.state.class}>
                            {this.state.message}
                        </div>
                        <textarea onChange={this.onChange} className="form-control" ></textarea>
                        <button disabled={this.state.isDisable} style={{margin:"5px"}} onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                        <span className={this.state.classButton}></span>
                    </div>
                    <div className="row">
                        {this.state.arr.map((item, i) =>

                            <div key={i} className="card col-md-3" style={{marginTop:"5px"}}>
                            <img width="20px" height="20px" src={require('../../images/comment.jpg')} alt="Card"/>
                            <div className="card-body">
                                <h4 className="card-title">{item.user.name}</h4>
                                <label>{item.dateTime}</label>
                                <p style={{whiteSpace: "pre-line"}} className="card-text">{item.content}</p>
                                {item.user.username === username ? (<button className="btn-sm btn-danger" onClick={()=>this.deleteComment(item.id)}>Delete</button>):""}
                            </div>
                            </div>
                        
                        )}
                    </div>
                   
                   
                </div>
            </div>

        );
    }
}

export default Comment;