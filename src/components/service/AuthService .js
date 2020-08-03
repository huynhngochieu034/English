import axios from 'axios';

const USER_API_BASE_URL = 'https://rocky-coast-50629.herokuapp.com/api/auth/';
const USER_API_BASE_URL2 = 'https://rocky-coast-50629.herokuapp.com/api/scores/';
const USER_API_BASE_URL3 = 'https://rocky-coast-50629.herokuapp.com/api/change/pass/';
const USER_API_BASE_URL4 = 'https://rocky-coast-50629.herokuapp.com/api/email/';
const USER_API_BASE_URL5 = 'https://rocky-coast-50629.herokuapp.com/api/comment/';
// const USER_API_BASE_URL = 'http://localhost:8080/api/auth/';
// const USER_API_BASE_URL2 = 'http://localhost:8080/api/scores/';
// const USER_API_BASE_URL3 = 'http://localhost:8080/api/change/pass/';
// const USER_API_BASE_URL4 = 'http://localhost:8080/api/email/';
// const USER_API_BASE_URL5 = 'http://localhost:8080/api/comment/';

class AuthService {

    getComment(){
        return axios.get(USER_API_BASE_URL5);
    }

    deleteComment(id){
        return axios.delete(USER_API_BASE_URL5+ id);
    }

    postComment(object){
        return axios.post(USER_API_BASE_URL5, object);
    }

    resetPassword(email){
        return axios.get(USER_API_BASE_URL4 + email);
    }

    changePassword(password){
        let username = this.getUserInfo().username;
        let object = {
            username: username,
            password: password
        }
        return axios.post(USER_API_BASE_URL3, object);
    }

    pushScores(object){
        return axios.put(USER_API_BASE_URL2, object);
    }

    getAllScores(){
        return axios.get(USER_API_BASE_URL2);
    }

    getScores(){
        let username = this.getUserInfo().username;
        return axios.get(USER_API_BASE_URL2 + username);
    }

    refreshAPI(){
        return axios.get(USER_API_BASE_URL + "refresh");
    }

    handleLogin(credentials){
        return axios.post(USER_API_BASE_URL + "signin", credentials);
    }

    register(credentials){
        return axios.post(USER_API_BASE_URL + "signup", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
       return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return "Ok";
    }
}

export default new AuthService();