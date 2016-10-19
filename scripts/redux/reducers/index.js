// combineReducers is a function to... combine reducers...
// it allows reducers that deal with complementary actions to be split up and them combined in one place
import { combineReducers } from 'redux';

// reducers take the previous state and an action and produce the next state
// they should be pure functions
const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        action.card,
      ];
    default:
      return state;
  }
};

// this combines all reducers into one
const rootReducer = combineReducers({
  cards,
});

export default rootReducer;
