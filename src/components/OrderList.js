import React, { Component } from "react";
import firebase from "firebase";
import OrderSortingType from "./OrderSortingType";
import OrderShowSelect from "./OrderShowSelect";
import ListItem from "./ListItem";
import OrderSearchInput from "./OrderSearchInput";
class OrderList extends Component {
  state = {
    items: [],
    change: false,
    sortType: "data_dodania",
    view: "all",
    search: ""
  };

  getItemsFromDatabase = () => {
    const db = firebase.firestore();
    db.collection("orders")
      .get()
      .then(querySnapshot => {
        this.setState({
          items: [
            ...querySnapshot.docs.map(doc => {
              const elements = doc.data();
              elements.key = doc.id;
              return elements;
            })
          ]
        });
      });
  };

  componentDidMount() {
    this.getItemsFromDatabase();
  }

  componentWillReceiveProps() {
    this.getItemsFromDatabase();
  }

  showDetails = () => {
    const db = firebase.firestore();
    db.collection("orders")
      .get()
      .then(querySnapshot => {
        this.setState({
          details: [
            ...querySnapshot.docs.map(doc => {
              const elements = doc.data();
              elements.key = doc.id;
              return elements;
            })
          ]
        });
      });
  };

  delItem = e => {
    const db = firebase.firestore();
    db.collection("orders")
      .doc(e.target.parentElement.parentElement.id)
      .delete()
      .then(() => {
        this.getItemsFromDatabase();
      });
  };

  done = e => {
    this.getItemsFromDatabase();
  };

searchEvent = (e) => {
  this.setState({ search:e.target.value });
}

  
  sortingType = e => {
    if (e.target.value === "data_dodania") {
      this.setState({ sortType: "data_dodania" });
    } else if (e.target.value === "termin_wykonania") {
      this.setState({ sortType: "termin_wykonania" });
    } else if (e.target.value === "nazwa") {
      this.setState({ sortType: "nazwa" });
    }
  };

  changeView = e => {
    if (e.target.value === "all") {
      this.setState({ view: "all" });
    } else if (e.target.value === "done") {
      this.setState({ view: "done" });
    } else if (e.target.value === "inProgress") {
      this.setState({ view: "inProgress" });
    }
  };

  render() {
    var libraries = this.state.items;

    var searchString = this.state.search.trim().toLowerCase();

if (searchString.length > 0) {
  libraries = libraries.filter(function(i) {
    if(i.name.toLowerCase().match(searchString)) {
      return i.name.toLowerCase().match( searchString );
    }
    if(i.phone.toLowerCase().match(searchString)) {
      return i.phone.toLowerCase().match( searchString );
    }
    return i.address.toLowerCase().match( searchString );
    
  });
}
    let sortedList;
    
    if (this.state.sortType === "data_dodania") {
      sortedList = libraries
        .sort((a, b) => b.sorting - a.sorting)
        .filter(e => {
          if (this.state.view === "all") {
            return e;
          } else if (this.state.view === "done") {
            return e.done === true;
          } else if (this.state.view === "inProgress") {
            return e.done === false;
          }
          return null;
        });
    } else if (this.state.sortType === "nazwa") {
      sortedList = libraries
        .sort(function(a, b) {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        .filter(e => {
          if (this.state.view === "all") {
            return e;
          } else if (this.state.view === "done") {
            return e.done === true;
          } else if (this.state.view === "inProgress") {
            return e.done === false;
          }
          return null;
        });
    }

    const listElements = sortedList.map((e, i) => {
      return (
        <ListItem
          key={i}
          el={e}
          id={i + 1}
          onDelete={this.delItem}
          onDone={this.done}
        />
      );
    });

    return (
      <div className="container-fluid">
      <h1 className="ordersHeader">Spis zleceń</h1>
        <OrderShowSelect changeView={this.changeView} />
        <OrderSortingType sortingChange={this.sortingType} />
        <OrderSearchInput onSearch={this.searchEvent} />
       
        <table className="table orderList">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Adres</th>
              <th scope="col">Kontakt</th>
              <th scope="col">Termin</th>
              <th scope="col">Opcje</th>
            </tr>
          </thead>
          <tbody>{listElements}</tbody>
        </table>
      </div>
    );
  }
}

export default OrderList;
