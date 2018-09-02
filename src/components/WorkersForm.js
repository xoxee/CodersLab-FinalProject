import React, { Component } from "react";
import firebase from "firebase";

class WorkersForm extends Component {
  state = {
    name: "",
    surname: "",

  };


  addItem = e => {
    e.preventDefault();
    const { name, surname } = this.state;
    let db = firebase.firestore();
    db.collection("workers").add({
      name: name,
      surname: surname,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/multirolo-8b586.appspot.com/o/avatar.png?alt=media&token=acac0f9d-f5da-45f0-873f-a8337f34b42f'
    });
    if (typeof this.props.closeEvent === "function") {
      this.props.closeEvent();
    }
  };

  render() {

    const { name, surname } = this.state;

    return (
      <div className="container-fluid workersContainer">
        <form>
          <div className="row">

            <div className="col">
              <label htmlFor="name">Imię</label>
              <input
                id="name"
                value={name}
                type="text"
                className="workerFormInput form-control"
                onChange={e => this.setState({name: e.target.value})}
              />

              <label htmlFor="surname">Nazwisko</label>
              <input
                id="surname"
                value={surname}
                type="text"
                className="workerFormInput form-control"
                onChange={e => this.setState({surname: e.target.value})}
              />
            </div>
          </div>
          <button
            typ="submit"
            className="btn btn-primary addWorkerBtn"
            onClick={this.addItem}
          >
            Dodaj
          </button>
        </form>
      </div>
    );
  }
}
export default WorkersForm;
