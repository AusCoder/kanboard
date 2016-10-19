
/*
keep track of card ids:
*/
let nextCardId = 0;

/*
action types
*/

export const ADD_CARD = 'ADD_CARD';
export const MOVE_CARD = 'MOVE_CARD';

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

export const addCard = (title, message, positionObj) => {
  const newCard = { id: nextCardId, title, message, positionObj };
  nextCardId += 1;
  return {
    type: ADD_CARD,
    card: newCard,
  };
};

export const moveCard = (id, xyCoords) => {
  return {
    type: MOVE_CARD,
    update: {
      id,
      x: xyCoords.x,
      y: xyCoords.y,
    },
  };
};
