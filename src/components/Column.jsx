import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Column.css';

export default function Column(props) {
  const { h2, componentClass, arr } = props;
  const cardsList = arr.map((item, index) => {
    return (
      <Draggable
        key={`${componentClass}-item-${index}`}
        draggableId={`${componentClass}-item-${index}`}
        index={index}>
        {(provided) => (
          <div
            className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.photo} alt={item.photo}/>
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <div className={componentClass}>
    <h2>{h2}</h2>
    <Droppable droppableId={componentClass}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} id={componentClass}>
          {cardsList}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
  );
}

Column.propTypes = {
  h2: PropTypes.string.isRequired,
  componentClass: PropTypes.string.isRequired,
  arr: PropTypes.array.isRequired,
};
