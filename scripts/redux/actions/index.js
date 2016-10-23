
/*
keep track of card ids and Z indices:
*/
let nextCardId = 0;
let nextZIndex = 0;

/*
action types
*/

export const ADD_CARD = 'ADD_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';

/*
action creators
*/

// this is redux thunk style actions...
// export const addCard = (card) => {
//   return (dispatch) => {
//     dispatch({
//       type: ADD_CARD,
//       card,
//     });
//   };
// };

export const addCard = (title, message, xyCoords) => {
  const positionObj = {
    ...xyCoords,
    z: nextZIndex,
  };
  nextZIndex += 1;
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
      positionObj: {
        ...xyCoords,
        z: nextZIndex++, // eslint-disable-line
      },
    },
  };
};

export const editCard = (id, title, message) => {
  return {
    type: EDIT_CARD,
    update: {
      id,
      title,
      message,
    },
  };
};

export const deleteCard = (id) => {
  return {
    type: DELETE_CARD,
    id,
  };
};
