import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EditCard from './components/EditCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  render() {
    const { editing } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>ToDo Manager</h1>
        </header>
        <section className="body">
          <div className="todo">
            <h2>ToDo</h2>
            <div id="todo" />
          </div>
          <div className="inprogress">
            <h2>In Progress</h2>
            <div id="inprogress" />
          </div>
          <div className="done">
            <h2>Done</h2>
            <div id="done" />
          </div>
          <div className="edit-container">
            <button type="button" onClick={this.toggleEditing.bind(this)}>Add new item</button>
            {editing ? <EditCard closeCardEditing={this.toggleEditing} /> : null}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
