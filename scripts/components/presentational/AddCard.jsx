import React, { PropTypes } from 'react';

const AddCard = ({ addCardFunction }) => {
  return (
    <div className="add-card-button button button-primary">
      <a onClick={addCardFunction}>
        <div>Add card!</div>
      </a>
    </div>
  );
};
AddCard.propTypes = {
  addCardFunction: PropTypes.func,
};

export default AddCard;
// <button onClick={addCardFunction}>Add Card!</button>
