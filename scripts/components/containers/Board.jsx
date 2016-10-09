/* global DEBUG */

import React, { Component } from 'react';
import $ from 'jquery';

import Card from 'kb-scripts/components/presentational/Card';
import AddCard from 'kb-scripts/components/presentational/AddCard';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      curId: 0,
      cards: [],
      newTitle: '',
      newMessage: '',
      toggleEdit: false,
    };
  }

  componentWillMount() {
    this.addCard('some title', 'some message');
  }

  componentDidMount() {
    // you can use something like this to get the width of the overall main screen:
    console.log($('.main').width());
  }

  addCard(someTitle, someMessage) {
    const sampleCard = { id: this.state.curId, title: someTitle, message: someMessage };
    this.setState({
      curId: this.state.curId + 1,
      cards: this.state.cards.concat([sampleCard]),
    });
  }

  toggleEdit() {
    this.setState({
      toggleEdit: !this.state.toggleEdit,
    });
  }

  // editCard(card) {
  //   return function (editedTitle, editedMessage) {
  //     card.title = editedTitle;
  //     card.message = editedMessage;
  //   }
  // }

  changeNewTitle(someTitle) {
    this.setState({
      newTitle: someTitle,
    });
  }

  changeNewMessage(someMessage) {
    this.setState({
      newMessage: someMessage,
    });
  }

  render() {
    const { cards } = this.state;

    return (
      <div>
        <div className="sidebar">
          <ul className="sidebar-nav">
            <li>
              <AddCard addCardFunction={() => this.addCard(this.state.newTitle, this.state.newMessage)} />
            </li>
            <li>
              <div className="input-group">
                <input type="text" className="form-control" onChange={(e) => { this.changeNewTitle(e.target.value); }} />
              </div>
              <div className="input-group">
                <input type="text" className="form-control" onChange={(e) => { this.changeNewMessage(e.target.value); }} />
              </div>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                {cards.map((card, idx) => {
                  return <Card key={idx} title={card.title} message={card.message} aZIndex={idx} editCb={() => this.toggleEdit()} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
