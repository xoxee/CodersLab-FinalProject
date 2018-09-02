import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from './routes/Home';
import Orders from './routes/Orders';
import Calendar from './routes/Calendar';
import Todo from './routes/Todo';
import Workers from './routes/Workers';
import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid appContainer">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/orders" component={Orders} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/todo" component={Todo} />
            <Route path="/workers" component={Workers} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
