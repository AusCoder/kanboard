/* global React, DEBUG, window */

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import Sidebar from 'kb-scripts/components/containers/Sidebar';

import Card from 'kb-scripts/components/presentational/Card';

import { addCard, moveCard, editCard, deleteCard } from 'kb-scripts/redux/actions';

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // action creators go here
    addCard,
    moveCard,
    editCard,
    deleteCard,
  }, dispatch);

  // alternatively
  //
  // return {
  //   addCard: (card) => {
  //     dispatch(addCard(card));
  //   },
  // };
};

@connect(mapStateToProps, mapDispatchToProps)
class Board extends Component {

  componentWillMount() {
    this.props.addCard('sample title', 'sample message', { x: 50, y: 50, z: 0 });
  }

  componentDidMount() {
    // you can use something like this to get the width of the overall main screen:
    console.log($(window).width());
  }

  render() {
    const { cards } = this.props;

    return (
      <div>
        <Sidebar
          addCard={this.props.addCard}
        />
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
                      editCb={(title, message) => this.props.editCard(card.id, title, message)}
                      moveCb={xyCoords => this.props.moveCard(card.id, xyCoords)}
                      delCb={() => this.props.deleteCard(card.id)}
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
Board.propTypes = {
  addCard: PropTypes.func,
  moveCard: PropTypes.func,
  editCard: PropTypes.func,
  deleteCard: PropTypes.func,
  cards: PropTypes.array,
};

export default Board;
