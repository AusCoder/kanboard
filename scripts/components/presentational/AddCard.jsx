import React, { PropTypes } from 'react';

const AddCard = ({ addCardFunction }) => {
  return (
    <div className="add-card-button button button-primary">
      <button onClick={addCardFunction}>Add Card!</button>
    </div>
  );
};
AddCard.propTypes = {
  addCardFunction: PropTypes.func,
};

export default AddCard;
