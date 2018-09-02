import React, { Component } from 'react'

class OrderShowSelect extends Component {
  
  
    handleShowChange = (e) => {
        if (typeof this.props.changeView === 'function') {
            this.props.changeView(e);
        }
    }

    render() {
    return (
        <div className="alignRight">
          <span>Wyświetl tylko: </span>
          <select className="custom-select" onChange={this.handleShowChange}>
            <option value="all">Wszystkie</option>
            <option value="done">Wykonane</option>
            <option value="inProgress">Do wykonania</option>
          </select>
        </div>
      );
  }
}

export default OrderShowSelect;