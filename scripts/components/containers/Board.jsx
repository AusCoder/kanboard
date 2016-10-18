/* global DEBUG */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import Card from 'kb-scripts/components/presentational/Card';
import AddCard from 'kb-scripts/components/presentational/AddCard';

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addCard: () => {
    //   dispatch(add a card ...)
    // },
    // updateCard: () => {
    //   dispatch(update a card ...)
    // },
  };
};

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
    this.addCard('some title', 'some message', { x: 50, y: 50, z: 0 });
  }

  componentDidMount() {
    // you can use something like this to get the width of the overall main screen:
    console.log($('.main').width());
  }

  addCard(someTitle, someMessage, positionObj) {
    const sampleCard = { id: this.state.curId, title: someTitle, message: someMessage, positionObj };
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

  editCard(cardId, title, message) {
    // this is annoying because currently we store the cards in the Board's state.
    // it would be better to store the information somewhere else, such as a redux store
    const card = this.state.cards.filter((c) => { return c.id === cardId; })[0];
    const otherCards = this.state.cards.filter((c) => { return c.id !== cardId; });
    card.title = title;
    card.message = message;
    this.setState({
      cards: otherCards.concat(card),
    });
  }
  deleteCard(cardId) {
    console.log('deleteing: ', cardId);
    const otherCards = this.state.cards.filter((c) => { return c.id !== cardId; });
    this.setState({
      cards: otherCards,
    });
  }
  moveCard(cardId, xyCoords) {
    const card = this.state.cards.filter((c) => { return c.id === cardId; })[0];
    const otherCards = this.state.cards.filter((c) => { return c.id !== cardId; });
    card.positionObj = { x: xyCoords.x, y: xyCoords.y, z: 0 };
    this.setState({
      cards: otherCards.concat(card),
    });
  }


  render() {
    const { cards } = this.state;

    return (
      <div>
        <div className="sidebar">
          <ul className="sidebar-nav">
            <li>
              <AddCard addCardFunction={() => this.addCard(this.state.newTitle, this.state.newMessage, { x: 0, y: 0, z: 0 })} />
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
                {cards.map((card) => {
                  return (
                    <Card
                      key={card.id}
                      title={card.title}
                      message={card.message}
                      positionObj={card.positionObj}
                      editCb={(title, message) => this.editCard(card.id, title, message)}
                      delCb={() => this.deleteCard(card.id)}
                      moveCb={xyCoords => this.moveCard(card.id, xyCoords)}
                    />
                );
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
