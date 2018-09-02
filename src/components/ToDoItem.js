import React, { Component } from "react";
import { Col, Card, CardImg, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';
import firebase from 'firebase';

class ToDoItem extends Component {
  handleDelItem = e => {
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(e);
    }
  };

  done = e => {
    const db = firebase.firestore();
    if (this.props.done) {
      db.collection("tasks")
        .doc(e.target.parentElement.parentElement.parentElement.id)
        .update({
          done: false
        });
    } else {
      db.collection("tasks")
        .doc(e.target.parentElement.parentElement.parentElement.id)
        .update({
          done: true
        });
    }

    this.handleDoneItem();
  };

  handleDoneItem = e => {
    if (typeof this.props.onDone === "function") {
      this.props.onDone(e);
    }
  };

  render() {

    const color = (this.props.done === true)
    ? '#70db70'
    : '#fff'

    return (

      <Card id={this.props.id} style={{backgroundColor: color}}>
        <CardBody style={{width:"90%"}}>
          <CardText>{this.props.task}</CardText>
          <div className="taskOptions">
          <i className="fas fa-check" onClick={this.done}/>
          <i className="far fa-trash-alt" onClick={this.handleDelItem} />
          </div>
          
        </CardBody>
      </Card>

    )
  }
}

export default ToDoItem;
