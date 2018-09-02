import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import firebase from 'firebase';

class ListItem extends Component {
  state = {
    modal: false,
    change: false,
    edit: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleDelItem = e => {
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(e);
    }
  };

  done = e => {
    const db = firebase.firestore();
  if(this.props.el.done) {

    db.collection("orders").doc(e.target.parentElement.parentElement.id).update({
      "done": false,
  })
  } else {

    db.collection("orders").doc(e.target.parentElement.parentElement.id).update({
      "done": true, 
  })
  }

  this.handleDoneItem();
}

  handleDoneItem = e => {
    if (typeof this.props.onDone === "function") {
      this.props.onDone(e);
    }
  };

  edit = () => {
    this.setState({
      edit: true
    })
  }

  render() {
    const details = this.props.el.products;

    const productDetails = details.map((e, i) => {
        return (
            <tr key={i}>
                <td>{e.type}</td>    
                <td>{e.width}</td>
                <td>{e.height}</td>
                <td>{e.fabric}</td>
                <td>{e.side}</td>
                <td>{e.quantity}</td>
                <td>{e.color}</td>
                <td>{e.comment}</td>
            </tr>
        )
    });

    const color = (this.props.el.done === true)
    ? '#70db70'
    : 'inherit'

    return (
      <tr style={{background: color}} id={this.props.el.key}>
        <th scope="row">{this.props.id}</th>
        <td>{this.props.el.name}</td>
        <td>{this.props.el.address}</td>
        <td>{this.props.el.phone}</td>
        <td>{this.props.el.time}</td>
        <td className="listOptionsIcons">
          <i className="fas fa-search" onClick={this.toggle}>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="modal-lg"
            >
              <ModalBody>
               <div className="container" id="toPrint">
               <div className="row customModalHeader">
                 <h5>
                   Nazwa: <span>{this.props.el.name}</span>
                 </h5>
                 <h5>
                   Kontakt: <span>{this.props.el.phone}</span>
                 </h5>
                 <h5>
                   Adres: <span>{this.props.el.address}</span>
                 </h5>
                 <h5>
                   Termin: <span>{this.props.el.time}</span>
                 </h5>
               </div>
               <div className="row">
                 <table className="table table-hover printTable">
                   <thead>
                     <tr>
                       <th scope="col">Typ</th>
                       <th scope="col">Szerokość</th>
                       <th scope="col">Wysokość</th>
                       <th scope="col">Tkanina</th>
                       <th scope="col">Sterowanie</th>
                       <th scope="col">Ilość</th>
                       <th scope="col">Kolor</th>
                       <th scope="col">Uwagi</th>
                     </tr>
                   </thead>
                   <tbody>{productDetails}</tbody>
                 </table>
               </div>
             </div>
             
                 
               
              </ModalBody>
              <ModalFooter>
                
                <Button color="primary" media="print" onClick={() => window.print()}>Drukuj</Button>
                <Button color="secondary" onClick={this.toggle}>
                  Zamknij
                </Button>
              </ModalFooter>
            </Modal>
          </i>
          <i className="fas fa-check" onClick={this.done}/>
          <i className="far fa-trash-alt" onClick={this.handleDelItem} />
        </td>
      </tr>
    );
  }
}

export default ListItem;
