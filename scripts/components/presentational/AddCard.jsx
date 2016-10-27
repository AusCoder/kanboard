import React, { PropTypes } from 'react';

const AddCard = ({ addCardFunction }) => {
  return (
    <div className="button button-primary">
      <a onClick={addCardFunction}>
        <i className="material-icons">rowing</i>
      </a>
    </div>
  );
};
AddCard.propTypes = {
  addCardFunction: PropTypes.func,
};

export default AddCard;
// <button onClick={addCardFunction}>Add Card!</button>
