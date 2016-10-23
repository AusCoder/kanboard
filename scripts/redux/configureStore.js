/* global window */

import { createStore } from 'redux';
import rootReducer from 'kb-scripts/redux/reducers';

const store = () => {
  // this allows you to use redux devtools
  return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

export default store;
