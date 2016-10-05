/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/containers/Board';

const app = document.getElementById('app');
ReactDOM.render(<Board />, app); // eslint-disable-line
