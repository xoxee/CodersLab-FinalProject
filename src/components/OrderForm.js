import React, { Component } from "react";
import firebase from "firebase";

class OrderForm extends Component {
  state = {
    products: [
      {
        type: "",
        width: "",
        height: "",
        fabric: "",
        quantity: "",
        color: "",
        comment: "",
        side: ""
      }
    ],
    name: "",
    phone: "",
    time: "",
    address: "",
    done: ""
  };

  addRow = e => {
    e.preventDefault();
    this.setState({
      products: [
        ...this.state.products,
        {
          type: "",
          width: "",
          height: "",
          fabric: "",
          quantity: "",
          color: "",
          comment: "",
          side: ""
        }
      ]
    });
  };

  handleFieldChange = e => {
    const inputLocation = e.target.name;

    const rowRE = /\d/;
    const fieldRE = /\d-([a-z]*.)/;

    const row = Number(rowRE.exec(inputLocation)[0]);
    const field = fieldRE.exec(inputLocation)[1];

    const newProducts = this.state.products.map((product, index) => {
      if (index === row) {
        return {
          ...product,
          [field]: e.target.value
        };
      }

      return product;
    });

    this.setState({
      products: newProducts
    });
  };

  

  addRecord = e => {
    e.preventDefault();
    const { name, phone, time, address, products } = this.state;
    var db = firebase.firestore();
    db.collection("orders").add({
      products: [...products],
      name: name,
      phone: phone,
      done: false,
      time: time,
      address: address,
      sorting: new Date().getTime()
    });
    if (typeof this.props.closeEvent === "function") {
      this.props.closeEvent();
    }
  };

  render() {
    const { products } = this.state;

    const items = products.map((e, i) => {
      return (
        <div className="form-row" id={i} key={i}>
          <div className="form-group col-md-2">
            <input
              type="text"
              className="form-control"
              name={`input-${i}-type`}
              placeholder="Typ produktu"
              value={products[i].type}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="text"
              className="form-control"
              placeholder="Szer."
              name={`input-${i}-width`}
              value={products[i].width}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="text"
              className="form-control"
              placeholder="Wys."
              name={`input-${i}-height`}
              value={products[i].height}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="text"
              className="form-control"
              value={products[i].fabric}
              name={`input-${i}-fabric`}
              onChange={this.handleFieldChange}
              placeholder="Tkanina"
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              name={`input-${i}-side`}
              value={products[i].side}
              placeholder="Sterowanie"
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="number"
              className="form-control"
              placeholder="szt."
              onChange={this.handleFieldChange}
              name={`input-${i}-quantity`}
              value={products[i].quantity}
            />
          </div>
          <div className="form-group col-md-1">
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              name={`input-${i}-color`}
              value={products[i].color}
              placeholder="Kolor"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              name={`input-${i}-comment`}
              value={products[i].comment}
              placeholder="Uwagi"
            />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <form>
          <div className="row">
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nazwisko / firma"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
              />
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="nr telefonu / email"
                value={this.state.phone}
                onChange={e => this.setState({phone: e.target.value})}
              />
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Termin (dd-mm-rrrr)"
                value={this.state.time}
                onChange={e => this.setState({time: e.target.value})}
              />
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Adres"
                value={this.state.address}
                onChange={e => this.setState({address: e.target.value})}
              />
            </div>
          </div>

          <button
            onClick={this.addRow}
            className="btn btn-primary newProductBtn"
          >
            dodaj produkt
          </button>

          <div className="row">{items}</div>

          <button
            typ="submit"
            className="btn btn-primary addOrderBtn"
            onClick={this.addRecord}
          >
            Dodaj zamówienie
          </button>
        </form>
      </div>
    );
  }
}
export default OrderForm;
