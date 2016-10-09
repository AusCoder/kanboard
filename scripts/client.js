/* global document */
import '!style!css!sass!../styles/client.scss'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Board from './components/containers/Board';

$(document).ready(() => {
  const app = document.getElementById('app');
  ReactDOM.render(<Board />, app); // eslint-disable-line
});
