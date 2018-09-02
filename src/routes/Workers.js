import React, { Component } from 'react'
import WorkerModal from '../components/WorkerModal';
import WorkersList from '../components/WorkersList';

class Workers extends Component {

  state = {
    upd: false
  }

  update = () => {
    this.setState({
        upd: !this.state.upd
    })
    
}

  render() {
    return (
      <div className="container workersContainer">
        <WorkerModal updateList={this.update}/>
        <WorkersList />
      </div>
    )
  }
}


export default Workers;