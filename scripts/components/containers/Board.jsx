/* global DEBUG, React */

import { Component } from 'react';

class Board extends Component {
  render() {
    if (DEBUG) {
      console.log('in debugging mode, allowed by webpacks DefinePlugin.');
    }
    return (
      <div>
        board component from another file!<br />
        plus 1 change!
      </div>
    );
  }
}

export default Board;
