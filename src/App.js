import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Vocabulary from './components/unit1/vocabulary';
import Practice from './components/unit2/unit2';
import Login from './components/users/login';
import Register from './components/users/register';
import Rank from './components/rank/rank';
import Practice2 from './components/unit3/unit3';
import Practice3 from './components/unit4/unit4';
import Practice4 from './components/unit5/unit5';
import Practice5 from './components/unit6/unit6';
import Practice6 from './components/unit7/unit7';
import Practice7 from './components/unit8/unit8';
import PrivateRoute from './components/private/PrivateRoute';
import Comment from './components/comments/comments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="main-route-place">
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute  path="/vocabulary" component={Vocabulary} />
            <PrivateRoute  path="/practice" component={Practice} />
            <PrivateRoute  path="/practice2" component={Practice2} />
            <PrivateRoute  path="/practice3" component={Practice3} />
            <PrivateRoute  path="/practice4" component={Practice4} />
            <PrivateRoute  path="/practice5" component={Practice5} />
            <PrivateRoute  path="/practice6" component={Practice6} />
            <PrivateRoute  path="/practice7" component={Practice7} />
            <PrivateRoute  path="/rank" component={Rank} />
            <PrivateRoute  path="/comment" component={Comment} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;