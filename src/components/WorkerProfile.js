import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import firebase from "firebase";


class WorkerProfile extends Component {
  state = {
    modal: false,
    change: false,
    edit: true,
    editButton: "Edytuj",
    selectedFile: null,
    imageUrl: "",
    bhp: "",
    medical: "",
    dateOfBirth: "",
    result: 0,
    vacation: [
      {
        startDate: "",
        endDate: "",
        daysSum: "",
        days: null
      }
    ],
    ...this.props.el
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  addRow = e => {
    this.setState({
      vacation: [
        ...this.state.vacation,
        {
          startDate: "",
          endDate: "",
          days: null,
          daysSum: 0
        }
      ]
    });
  };

  handleFieldChange = e => {
    const inputLocation = e.target.name;

    const rowRE = /\d/;
    const fieldRE = /\d-(\S*)/;

    const row = Number(rowRE.exec(inputLocation)[0]);
    const field = fieldRE.exec(inputLocation)[1];

    const newVacation = this.state.vacation.map((vacation, index) => {
      if (index === row) {
        return {
          ...vacation,
          [field]: e.target.value
        };
      }

      return vacation;
    });

    const vac = newVacation.map((element, i) => {
      if (i === row) {
        return {
          ...element,
          daysSum:
            element.startDate && element.endDate
              ? Math.ceil(
                  (new Date(element.endDate) - new Date(element.startDate)) /
                    86400
                ) /
                  1000 +
                1 -
                this.calcBusinessDays(element.startDate, element.endDate)
              : 0
        };
      }

      return element;
    });

    this.setState({
      vacation: vac
    });
  };

  handleDelItem = e => {
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(e);
    }
  };

  fileSelectedhandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  fileSelectedhandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  fileUploadHandler = () => {
    const ref = firebase.storage().ref();
    const file = this.state.selectedFile;
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        this.setState({
          imageUrl: url
        });

        var db = firebase.firestore();
        db.collection("workers")
          .doc(this.props.el.key)
          .update({
            imageUrl: url
          });

        document.querySelector("#profilowe").src = url;
      })
      .catch(console.error);

    return task;
  };

  editInputs = () => {
    if (this.state.edit === true) {
      this.setState({
        edit: false,
        editButton: "Zapisz zmiany"
      });
    } else {
      this.setState(
        {
          edit: true,
          editButton: "Edytuj"
        },
        () => {
          var db = firebase.firestore();
          db.collection("workers")
            .doc(this.props.el.key)
            .update({
              bhp: this.state.bhp,
              medical: this.state.medical,
              dateOfBirth: this.state.dateOfBirth,
              vacation: this.state.vacation
            });
        }
      );
    }
  };

  calcBusinessDays = (start, end) => {
    var s = new Date(start);
    var e = new Date(end);

    var addOneMoreDay = 0;
    if (s.getDay() === 0 || s.getDay() === 6) {
      addOneMoreDay = 1;
    }

    // Set time to midday to avoid dalight saving and browser quirks
    s.setHours(12, 0, 0, 0);
    e.setHours(12, 0, 0, 0);

    // Get the difference in whole days
    var totalDays = Math.round((e - s) / 8.64e7);

    // Get the difference in whole weeks
    var wholeWeeks = (totalDays / 7) | 0;

    // Estimate business days as number of whole weeks * 5
    var days = wholeWeeks * 5;

    // If not even number of weeks, calc remaining weekend days
    if (totalDays % 7) {
      s.setDate(s.getDate() + wholeWeeks * 7);

      while (s < e) {
        s.setDate(s.getDate() + 1);

        // If day isn't a Sunday or Saturday, add to business days
        if (s.getDay() !== 0 && s.getDay() !== 6) {
          ++days;
        }
        //s.setDate(s.getDate() + 1);
      }
    }
    var weekEndDays = totalDays - days + addOneMoreDay;
    return weekEndDays;
  };


  render() {
    let result = 0;

    for (let i = 0; i < this.state.vacation.length; i++) {
      result += this.state.vacation[i].daysSum;
    }

    if (this.state.result !== result) {
      this.setState({
        result: result
      });
    }

    const {
      vacation,
      modal,
      edit,
      bhp,
      dateOfBirth,
      medical,
      editButton
    } = this.state;

    const vacationItems = vacation.map((e, i) => {
      return (
        <div className="row" key={i} id={i}>
          <div className="form-group col-md-5">
            <input
              type="date"
              name={`input-${i}-startDate`}
              value={vacation[i].startDate}
              className="form-control"
              onChange={this.handleFieldChange}
              disabled={edit}
            />
          </div>
          <div className="form-group col-md-5">
            <input
              type="date"
              name={`input-${i}-endDate`}
              value={vacation[i].endDate}
              className="form-control"
              onChange={this.handleFieldChange}
              disabled={edit}
            />
          </div>
          <div className="col-md-2">
            <p className="countVacationDays">{vacation[i].daysSum}</p>
          </div>
        </div>
      );
    });

    return (
      <tr id={this.props.el.key}>
        <th scope="row">{this.props.id}</th>
        <td>{this.props.el.name}</td>
        <td>{this.props.el.surname}</td>
        <td>{this.props.el.dateOfBirth}</td>

        <td className="listOptionsIcons">
          <i className="fas fa-search" onClick={this.toggle}>
            <Modal
              isOpen={modal}
              toggle={this.toggle}
              className="modal-lg"
              id="workersModal"
            >
              <ModalBody>
                <div className="container">
                  <div className="workerProfileModal">
                    <div className="row">
                      <div className="col-md-5">
                        <img
                          id="profilowe"
                          src={this.props.el.imageUrl}
                          alt=""
                        />
                        <div className="addPhoto">
                          <input
                            type="file"
                            id="addProfilePhoto"
                            onChange={this.fileSelectedhandler}
                          />
                          <button onClick={this.fileUploadHandler}>
                            Dodaj
                          </button>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <h1>
                          {this.props.el.name} {this.props.el.surname}
                        </h1>
                        <hr />

                        <div className="col">
                          <ul className="workerDetailsList">
                            <li>
                              Data urodzenia:{" "}
                              <input
                                onChange={e =>
                                  this.setState({
                                    dateOfBirth: e.target.value
                                  })
                                }
                                disabled={edit}
                                className="workerDetailsInput"
                                value={dateOfBirth}
                              />
                            </li>
                            <li>
                              Termin badania lekarskiego:{" "}
                              <input
                                onChange={e =>
                                  this.setState({ medical: e.target.value })
                                }
                                disabled={edit}
                                className="workerDetailsInput"
                                value={medical}
                              />
                            </li>
                            <li>
                              Termin szkolenia BHP:{" "}
                              <input
                                onChange={e =>
                                  this.setState({ bhp: e.target.value })
                                }
                                disabled={edit}
                                className="workerDetailsInput"
                                value={bhp}
                              />
                            </li>
                          </ul>
                        </div>

                        <div className="col">
                          <h3>Urlopy</h3>

                          {vacationItems}

                          <i className="fas fa-plus" onClick={this.addRow} />
                          <p className="daysResult">{this.state.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.editInputs}>
                  {editButton}
                </Button>
                <Button color="secondary" onClick={this.toggle}>
                  Zamknij
                </Button>
              </ModalFooter>
            </Modal>
          </i>
          <i className="far fa-trash-alt" onClick={this.handleDelItem} />
        </td>
      </tr>
    );
  }
}

export default WorkerProfile;
