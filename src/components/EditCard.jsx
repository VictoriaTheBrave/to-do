import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditCard.css';

export default class EditCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { title: '', description: '', photo: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { id } = event.target;
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { closeCardEditing } = this.props;
    closeCardEditing();
  }

  render() {
    const { title, description, photo } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="edit-card">
        <label htmlFor="title">
          <h3>Title</h3>
          <input type="text" id="title" value={title} onChange={this.handleChange} />
        </label>
        <label htmlFor="progress">
          <h3>Choose the Item state</h3>
          <select id="progress">
            <option value="todo">ToDo</option>
            <option value="inprogress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label htmlFor="title">
          <h3>Description</h3>
          <input type="text" id="description" value={description} onChange={this.handleChange} />
        </label>
        <label htmlFor="photo">
          <h3>Photo</h3>
          <input type="file" value={photo} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Save" className="submit" />
      </form>
    );
  }
}

EditCard.propTypes = {
  closeCardEditing: PropTypes.func.isRequired,
};
