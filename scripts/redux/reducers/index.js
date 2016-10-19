// combineReducers is a function to... combine reducers...
// it allows reducers that deal with complementary actions to be split up and them combined in one place
import { combineReducers } from 'redux';

/*
helper functions
*/
const updatePositionById = (cards, updateData) => {
  // for arrays ... expands in place, so this effectively creates a new array
  const newCards = [...cards];
  const rest = newCards.filter((c) => { return c.id !== updateData.id; });
  let movedCard = newCards.filter((c) => { return c.id === updateData.id; })[0];
  movedCard.positionObj = { x: updateData.x, y: updateData.y };
  return rest.concat(movedCard);
};


// reducers take the previous state and an action and produce the next state
// they should be pure functions
const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        action.card,
      ];
    case 'MOVE_CARD':
      return updatePositionById(state, action.update);
    default:
      return state;
  }
};

// this combines all reducers into one
const rootReducer = combineReducers({
  cards,
});

export default rootReducer;
