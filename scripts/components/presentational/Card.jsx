import React, { PropTypes } from 'react';

const Card = ({ title, message }) => {
  return (
    <div className="card">
      <div className="card-title">
        {title}
      </div>
      <div className="card-message">
        {message}
      </div>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Card;
