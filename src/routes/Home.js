import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="homeContainer">
      <h1>MultiRolo App</h1>
      </div>

          <div className="row btnRow">
            <Link to="/orders" className="col homeBtn btn1"><i className="fas fa-list"></i><h1>Lista zleceń</h1></Link>
            <Link to="/calendar" className="col homeBtn btn2"><i className="far fa-calendar-alt"></i><h1>Terminarz</h1></Link>
            <Link to="/todo" className="col homeBtn btn3"><i className="far fa-calendar-check"></i><h1>Lista zadań</h1></Link>
            <Link to="/workers" className="col homeBtn btn3"><i className="fas fa-users"></i><h1>Pracownicy</h1></Link>
          </div>  

      </div>
    )
  }
}


export default Home;