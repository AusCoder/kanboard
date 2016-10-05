/* global DEBUG */

import React, { Component } from 'react';
import Card from 'kb-scripts/components/presentational/Card';
import AddCard from 'kb-scripts/components/presentational/AddCard';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentWillMount() {
    const sampleCard = { title: 'some title', message: 'some message' };
    this.setState({
      cards: this.state.cards.concat([sampleCard]),
    });
  }

  addCard() {
    const sampleCard = { title: 'some title', message: 'some message' };
    this.setState({
      cards: this.state.cards.concat([sampleCard]),
    });
  }

  render() {
    // if (DEBUG) {
    //   console.log('in debugging mode, allowed by webpacks DefinePlugin.');
    // }
    const { cards } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="sidebar col-xs-2">
              <AddCard addCardFunction={() => this.addCard()} />
            </div>
            <div className="main col-xs-10">
              {cards.map((card, idx) => {
                return <Card key={idx} title={card.title} message={card.message} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
