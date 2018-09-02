import React, { Component } from "react";
import OrderForm from "./OrderForm";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
     
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.updateList();
  }

  render() {
    return (
      <div>
        <Button color="danger" className="btnMargin" onClick={this.toggle}>
          Dodaj nowe zlecenie
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-lg"
        >
          <ModalHeader toggle={this.toggle}>Dodaj nowe zlecenie</ModalHeader>
          <ModalBody className="modalPadding">
            <OrderForm closeEvent={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default OrderModal;
