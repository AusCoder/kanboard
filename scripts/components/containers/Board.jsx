/* global DEBUG */

import React, { Component } from 'react';
import Card from 'kb-scripts/components/presentational/Card';

class Board extends Component {
  render() {
    if (DEBUG) {
      console.log('in debugging mode, allowed by webpacks DefinePlugin.');
    }
    return (
      <div>
        board component from another file!<br />
        plus 1 change!
        <Card title="some title" message="some message" />
      </div>
    );
  }
}

export default Board;
