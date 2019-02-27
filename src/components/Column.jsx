import React from 'react';
import PropTypes from 'prop-types';

export default function Column(props) {
  const { h2, componentClass, arr } = props;
  const cardsList = arr.map((item, i) => {
    return (
      <div key={i + item.title}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <img src={item.photo} alt={item.photo}/>
      </div>
    );
  });

  return (
    <div className={componentClass}>
      <h2>{h2}</h2>
      <div id={componentClass}>
        {cardsList}
      </div>
    </div>
  );
}

Column.propTypes = {
  h2: PropTypes.string.isRequired,
  componentClass: PropTypes.string.isRequired,
  arr: PropTypes.array.isRequired,
};
