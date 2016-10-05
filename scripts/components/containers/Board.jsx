/* global DEBUG */

import React, { Component } from 'react';
import Card from 'kb-scripts/components/presentational/Card';

class Board extends Component {
  render() {
    if (DEBUG) {
      console.log('in debugging mode, allowed by webpacks DefinePlugin.');
    }
    return (
      <div className="board">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <Card title="some title" message="some message" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
