import React, { PropTypes } from 'react';

const Card = ({ title, message }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Card;
