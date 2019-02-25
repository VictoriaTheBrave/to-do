import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    user: null,
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>ToDo Manager</h1>
        </header>
        <section className="body">
          <div className="todo">
            <h2>ToDo</h2>
          </div>
          <div>
            <h2>In Progress</h2>
          </div>
          <div>
            <h2>Done</h2>
          </div>
          <div className="todo">
            <button type="button">Add new item</button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
