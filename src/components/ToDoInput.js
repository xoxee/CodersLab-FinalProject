import React, { Component } from "react";
import firebase from 'firebase';

class ToDoInput extends Component {
  state = {
    newTask: ""
  };


  addTask = e => {
    var db = firebase.firestore();
    db.collection("tasks").add({
     task: this.state.newTask,
     done: false,
     sorting: new Date().getTime()
    });

    this.setState({
        newTask: ""
    })
    this.handleAddTask();

  };

  handleAddTask = () => {
 
      if(typeof this.props.addTask === 'function') {
          this.props.addTask()
      }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="taskInput"
          className="col-md-4 form-control"
          value={this.state.newTask}
          onChange={e => this.setState({ newTask: e.target.value })}
        />
        <button className="btn btn-primary taskBtn" onClick={this.addTask}>Dodaj zadanie</button>
      </div>
    );
  }
}

export default ToDoInput;
