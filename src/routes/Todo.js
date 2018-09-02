import React, { Component } from 'react'
import ToDoList from '../components/ToDoList';


class Todo extends Component {

  state = {
    change: false
  }
  
  render() {
    return (
      <div className="todoList">
        <h1>Notatki</h1>
        
        <ToDoList />
      </div>
    )
  }
}

export default Todo;
