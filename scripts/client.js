/* global document */
import '!style!css!sass!../styles/client.scss'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// this passes the redux store to all subsequent components
import { Provider } from 'react-redux';

import Board from 'kb-scripts/components/containers/Board';

import configureStore from 'kb-scripts/redux/configureStore';

const store = configureStore();

$(document).ready(() => {
  const app = document.getElementById('app');
  ReactDOM.render(
    <Provider store={store} >
      {/* here we render the root component for the app, this could be a ReactRouter, if we wanted to use that */}
      <Board />
    </Provider>,
    app);
});
