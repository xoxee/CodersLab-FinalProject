import React, { Component } from "react";
import OrderModal from "../components/OrderModal";
import OrderList from "../components/OrderList";


class Orders extends Component {

state = {
   upd: true
}

update = () => {
    this.setState({
        upd: !this.state.upd
    })
}

  render() {
    return (
      <div className="container-fluid ordersContainer">
        <div className="row">
          <OrderModal updateList={this.update}/>
          <OrderList upd={this.state.upd}/>
        </div>
      </div>
    );
  }
}
export default Orders;
