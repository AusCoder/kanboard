// combineReducers is a function to... combine reducers...
// it allows reducers that deal with complementary actions to be split up and them combined in one place
import { combineReducers } from 'redux';

import * as Actions from 'kb-scripts/redux/actions';

/*
helper functions
*/
// for arrays ... expands in place, so this effectively creates a new array
// redux requires us to create a new array in each reducer
const updatePositionById = (cards, updateData) => {
  const newCards = [...cards];
  const rest = newCards.filter((c) => { return c.id !== updateData.id; });
  let movedCard = newCards.filter((c) => { return c.id === updateData.id; })[0];
  movedCard.positionObj = updateData.positionObj;
  return rest.concat(movedCard);
};
const updateTextById = (cards, updateData) => {
  const newCards = [...cards];
  const rest = newCards.filter((c) => { return c.id !== updateData.id; });
  let movedCard = newCards.filter((c) => { return c.id === updateData.id; })[0];
  movedCard.title = updateData.title;
  movedCard.message = updateData.message;
  return rest.concat(movedCard);
};
const deleteCardById = (cards, id) => {
  return [...cards].filter((c) => { return c.id !== id; });
};

// reducers take the previous state and an action and produce the next state
// they should be pure functions
const cards = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_CARD:
      return [
        ...state,
        action.card,
      ];

    case Actions.MOVE_CARD:
      return updatePositionById(state, action.update);

    case Actions.EDIT_CARD:
      return updateTextById(state, action.update);

    case Actions.DELETE_CARD:
      return deleteCardById(state, action.id);
    default:
      return state;
  }
};

// this combines all reducers into one
const rootReducer = combineReducers({
  cards,
});

export default rootReducer;
