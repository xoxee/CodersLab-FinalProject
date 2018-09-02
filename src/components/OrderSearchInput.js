import React, { Component } from 'react'

class OrderSearchInput extends Component {
    handleSearchChange = (e) => {
        if (typeof this.props.onSearch === 'function') {
            this.props.onSearch(e);
        }
    }

  render() {
    return (
    <div className="alignRight"> 
    <span>Wyszukaj</span>
        <input onChange={this.handleSearchChange}
        type="text" className="form-control searchInput"/>
      </div>
    )
  }
}

export default OrderSearchInput;