import React, { Component } from 'react';
import logo from './logo.svg';
import Column from './components/Column';
import EditCard from './components/EditCard';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      todo: [],
      inprogress: [],
      done: [],
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.addToDoCard = this.addToDoCard.bind(this);
  }

  toggleEditing() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  addToDoCard(key, obj) {
    this.setState(() => this.state[key].push(obj));
  }

  render() {
    const { editing, todo, inprogress, done } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>ToDo Manager</h1>
        </header>
        <section className="body">
          <Column h2="ToDo" componentClass="todo" arr={todo} />
          <Column h2="In Progress" componentClass="inprogress" arr={inprogress} />
          <Column h2="Done" componentClass="done" arr={done} />
          <div className="edit-container">
            <button type="button" onClick={this.toggleEditing.bind(this)}>Add new item</button>
            {editing ? <EditCard closeCardEditing={this.toggleEditing} addToDoCard={this.addToDoCard} /> : null}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
