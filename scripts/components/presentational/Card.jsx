// import ReactDOM from "react-dom";

import React, { PropTypes } from 'react';
import Draggable from 'react-draggable';

const Card = ({ title, message, aZIndex }) => {
  return (
    <Draggable zIndex={aZIndex} >
      <div className="card" style={{ zIndex: aZIndex }}>
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </Draggable>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  aZIndex: PropTypes.number,
  style: PropTypes.object, // eslint-disable-line
};

export default Card;
