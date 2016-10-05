/* global document */
import '!style!css!sass!../styles/client.scss'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/containers/Board';

const app = document.getElementById('app');
ReactDOM.render(<Board />, app); // eslint-disable-line
