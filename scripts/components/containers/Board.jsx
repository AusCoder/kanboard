/* global React, DEBUG */

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import Card from 'kb-scripts/components/presentational/Card';
import AddCard from 'kb-scripts/components/presentational/AddCard';

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
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newMessage: '',
    };
  }

  componentWillMount() {
    this.props.addCard('sample title', 'sample message', { x: 50, y: 50, z: 0 });
  }

  componentDidMount() {
    // you can use something like this to get the width of the overall main screen:
    console.log($('.main').width());
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

  render() {
    const { cards } = this.props;

    return (
      <div>
        <div className="sidebar">
          <ul className="sidebar-nav">
            <li>
              <AddCard addCardFunction={() => this.props.addCard(this.state.newTitle, this.state.newMessage, { x: 0, y: 0 })} />
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
