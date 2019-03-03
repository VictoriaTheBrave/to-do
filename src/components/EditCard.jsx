import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditCard.css';

export default class EditCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      title: this.props.editMode.title || '',
      description: this.props.editMode.description || '',
      photo: this.props.editMode.photo || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleChange(event) {
    const { id } = event.target;
    this.setState({ [id]: event.target.value });
  }

  handlePhotoChange(event) {
    function generateImgUrl(file, callback) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => callback(reader.result);
    }
    const file = event.target.files[0]

    if (!file) {
      return
    }

    if (file.size > 307200) {
      alert('File is too big! Try load a smaller file');
    }

    generateImgUrl(file, imgUrl => {
      this.setState({ photo: imgUrl });
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (typeof this.props.editMode === 'object') {
      this.props.addCard(this.props.editMode.column, this.state, this.props.editMode.index);
    } else {
      this.props.addCard('todo', this.state);
    }
    this.props.closeCardEditing();
  }

  render() {
    const { title, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="edit-card">
        <label htmlFor="title">
          <h3>Title</h3>
          <input type="text" id="title" value={title} onChange={this.handleChange}  minLength={2} />
        </label>
        <label htmlFor="title">
          <h3>Description</h3>
          <textarea type="text" id="description" value={description} onChange={this.handleChange} />
        </label>
        <label htmlFor="photo">
          <h3>Photo</h3>
          <input type="file"
            ref={this.fileInput}
            onChange={this.handlePhotoChange}
            accept=".png,.jpg,.jpeg,.svg"
          />
        </label>
        <input type="submit" value="Save" className="submit" />
      </form>
    );
  }
}

EditCard.propTypes = {
  closeCardEditing: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  editMode: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
};
