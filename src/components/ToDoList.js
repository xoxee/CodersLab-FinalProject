import React, { Component } from "react";
import firebase from "firebase";
import ToDoItem from "./ToDoItem";
import ToDoInput from "../components/ToDoInput";
class ToDoList extends Component {
  state = {
    items: []
  };

  getItemsFromDatabase = () => {
    const db = firebase.firestore();
    db.collection("tasks")
      .get()
      .then(querySnapshot => {
        this.setState({
          items: [
            ...querySnapshot.docs.map(doc => {
              const elements = doc.data();
              elements.key = doc.id;
              return elements;
            })
          ]
        });
      });
  };

  delItem = e => {
    const db = firebase.firestore();
    db.collection("orders")
      .doc(e.target.parentElement.parentElement.id)
      .delete()
      .then(() => {
        this.getItemsFromDatabase();
      });
  };

  done = e => {
    this.getItemsFromDatabase();
  };

  componentDidMount = () => {
    const db = firebase.firestore();
    db.collection("tasks")
      .get()
      .then(querySnapshot => {
        this.setState({
          items: [
            ...querySnapshot.docs.map(doc => {
              const elements = doc.data();
              elements.key = doc.id;
              return elements;
            })
          ]
        });
      });
  };

  delItem = e => {
    const db = firebase.firestore();
    db.collection("tasks")
      .doc(e.target.parentElement.parentElement.parentElement.id)
      .delete()
      .then(() => {
        this.getItemsFromDatabase();
      });
  };

  render() {
    const sorted = this.state.items.sort((a, b) => b.sorting - a.sorting);
    const list = sorted.map((e, i) => {
      return (
        <ToDoItem
          task={e.task}
          done={e.done}
          id={e.key}
          key={i}
          onDone={this.done}
          onDelete={this.delItem}
        />
      );
    });

    return (
      <div className="container">
        <ToDoInput addTask={this.getItemsFromDatabase} />
        {list}
      </div>
    );
  }
}

export default ToDoList;
