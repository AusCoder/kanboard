
import _ from 'lodash';
/*
keep track of card ids:
*/
let nextCardId = 0;

/*
action types
*/

export const ADD_CARD = 'ADD_CARD';

/*
action creators
*/

// export const addCard = (card) => {
//   return (dispatch) => {
//     dispatch({
//       type: ADD_CARD,
//       card,
//     });
//   };
// };

export const addCard = (card) => {
  const nextCard = _.merge(card, { id: nextCardId });
  nextCardId++;
  return {
    type: ADD_CARD,
    card: nextCard,
  };
};
