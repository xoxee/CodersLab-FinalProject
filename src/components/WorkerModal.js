import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import WorkersForm from "./WorkersForm";

class WorkerModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
      
    });
    this.props.updateList();
  };

  render() {
    return (
      <div>
        <Button color="danger" className="btnMargin" onClick={this.toggle}>
          Dodaj pracownika
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Dodaj pracownika</ModalHeader>
          <ModalBody className="modalPadding">
            <WorkersForm closeEvent={this.toggle} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default WorkerModal;
