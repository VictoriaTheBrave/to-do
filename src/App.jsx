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
      editCurrent: '',
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.addCard = this.addCard.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.editCard = this.editCard.bind(this);
  }

  toggleEditing() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  addCard(key, obj, edit = false) {
    obj.taskID = `${key}-task-${this.state[key].length}`;
    if (typeof edit === 'boolean') {
      this.setState(() => this.state[key].push(obj));
    } else {
      this.setState((state) => state[key][edit] = obj);
    }
  }

  editCard(e) {
    const cardContent = e.target.parentNode.children;
    const currentColumn = e.target.parentNode.parentNode;
    this.setState({
      editing: true,
      editCurrent: {
        title: cardContent[0].innerHTML,
        description: cardContent[1].innerHTML,
        photo: cardContent[3].src,
        column: currentColumn.id,
        index: Array.from(currentColumn.children).indexOf(e.target.parentNode),
      }
    });
  }

  onDragEnd(result) {
    const { source, destination } = result;
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
    const { editing, todo, inprogress, done, editCurrent } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>ToDo Manager</h1>
          </header>
          <section className="body">
            <Column h2="ToDo" componentClass="todo" arr={todo} editCard={this.editCard} />
            <Column h2="In Progress" componentClass="inprogress" arr={inprogress} editCard={this.editCard} />
            <Column h2="Done" componentClass="done" arr={done} editCard={this.editCard} />
            <div className="edit-container">
              <button type="button" onClick={this.toggleEditing.bind(this)}>Add new card</button>
              {editing ?
                <EditCard closeCardEditing={this.toggleEditing} addCard={this.addCard} editMode={editCurrent} />
                : null}
            </div>
          </section>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
