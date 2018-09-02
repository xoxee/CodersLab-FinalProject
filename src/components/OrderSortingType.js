import React, { Component } from "react";

class OrderSortingType extends Component {

    handleSelectChange = (e) => {
        if (typeof this.props.sortingChange === 'function') {
            this.props.sortingChange(e);
        }
    }

  render() {
    return (
      <div className="alignRight"> 
        <span>Sortuj według: </span>
        <select className="custom-select" onChange={this.handleSelectChange}>
          <option value="data_dodania">data dodania</option>
          <option value="nazwa">nazwa</option>
        </select>
      </div>
    );
  }
}

export default OrderSortingType;
