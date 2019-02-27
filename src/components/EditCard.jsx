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
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }

  handleChange(event) {
    const { id } = event.target;
    this.setState({ [id]: event.target.value });
  }

  handlePhotoChange(event) {
    this.setState({ photo: event.target.files[0].name });
  }

  handleSubmit(event) {
    console.log(this);
    event.preventDefault();
    this.props.addToDoCard('todo', this.state);
    this.props.closeCardEditing();
  }

  render() {
    const { title, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="edit-card">
        <label htmlFor="title">
          <h3>Title</h3>
          <input type="text" id="title" value={title} onChange={this.handleChange} />
        </label>
        <label htmlFor="title">
          <h3>Description</h3>
          <textarea type="text" id="description" value={description} onChange={this.handleChange} />
        </label>
        <label htmlFor="photo">
          <h3>Photo</h3>
          <input type="file" onChange={this.handlePhotoChange} />
        </label>
        <input type="submit" value="Save" className="submit" />
      </form>
    );
  }
}

EditCard.propTypes = {
  closeCardEditing: PropTypes.func.isRequired,
  addToDoCard: PropTypes.func.isRequired,
};
