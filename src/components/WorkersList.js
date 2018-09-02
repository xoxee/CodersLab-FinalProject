import React, { Component } from "react";
import firebase from "firebase";
import WorkerProfile from "./WorkerProfile";
import OrderSearchInput from "./OrderSearchInput";

class WorkersList extends Component {
  state = {
    items: [],
    search: ""
  };

  getItemsFromDatabase = () => {
    const db = firebase.firestore();
    db.collection("workers")
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
    db.collection("workers")
      .doc(e.target.parentElement.parentElement.id)
      .delete()
      .then(() => {
        this.getItemsFromDatabase();
      });
  };

  searchEvent = e => {
    this.setState({ search: e.target.value });
  };

  newImage = () => {
    
  }


  render() {
    let libraries = this.state.items;
  
    let searchString = this.state.search.trim().toLowerCase();

    if (searchString.length > 0) {
      libraries = libraries.filter(function(i) {
        if (i.name.toLowerCase().match(searchString)) {
          return i.name.toLowerCase().match(searchString);
        }
        if (i.surname.toLowerCase().match(searchString)) {
          return i.surname.toLowerCase().match(searchString);
        }
        return i;
      });
    }

    let keysSorted = libraries.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    const listElements = keysSorted.map((e, i) => {
      return (
        <WorkerProfile
        onChange={this.newImage}
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
        <h1 className="ordersHeader">Pracownicy</h1>
        <OrderSearchInput onSearch={this.searchEvent} />
        <table className="table orderList">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Data urodzenia</th>
              <th scope="col">Opcje</th>
            </tr>
          </thead>
          <tbody>{listElements}</tbody>
        </table>
      </div>
    );
  }
}

export default WorkersList;
