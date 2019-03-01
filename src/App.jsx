import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  toggleEditing() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  addToDoCard(key, obj) {
    obj.taskID = `${key}-task-${this.state[key].length}`;
    this.setState(() => this.state[key].push(obj));
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return; 
    
    const start = this.state[source.droppableId];
    const finish = this.state[destination.droppableId];
    const draggableCard = start.splice(source.index, 1);

    if (start === finish) {
      start.splice(destination.index, 0, draggableCard[0]);
      start.forEach((obj, i) => obj.taskID = `${source.droppableId}-task-${i}`);
      this.setState({ [source.droppableId]: start });
    } else {
      finish.splice(destination.index, 0, draggableCard[0]);
      start.forEach((obj, i) => obj.taskID = `${source.droppableId}-task-${i}`);
      finish.forEach((obj, i) => obj.taskID = `${destination.droppableId}-task-${i}`);
      this.setState({ [source.droppableId]: start, [destination.droppableId]: finish });
    }
  }

  render() {
    const { editing, todo, inprogress, done } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
      </DragDropContext>
    );
  }
}

export default App;
