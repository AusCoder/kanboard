// import ReactDOM from "react-dom";

import React, { PropTypes } from 'react';
import Draggable from 'react-draggable';

const Card = ({ title, message, aZIndex, editCb }) => {
  return (
    <Draggable zIndex={aZIndex} >
      <div className="card" >
        <div className="card-edit">
          <a onClick={() => editCb()}>delete</a>
        </div>
        <div className="card-edit">
          <a onClick={() => editCb()}>edit</a>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-message">
          {message}
        </div>
      </div>
    </Draggable>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  aZIndex: PropTypes.number,
  editCb: PropTypes.func,
};

export default Card;
