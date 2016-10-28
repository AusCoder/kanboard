import { Component, PropTypes } from 'react';

import AddCard from 'kb-scripts/components/presentational/AddCard';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newMessage: '',
      toggleAddCard: false,
    };
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
  _toggleAddCardOn() {
    this.setState({
      toggleAddCard: true,
    });
  }
  _toggleAddCardOff() {
    this.setState({
      toggleAddCard: false,
    });
  }
  _addCard() {
    this.props.addCard(this.state.newTitle, this.state.newMessage, { x: 0, y: 0 });
    this.setState({
      newTitle: '',
      newMessage: '',
      toggleAddCard: false,
    });
  }

  render() {
    const { newTitle, newMessage } = this.state;
    return (
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <a className={this.state.toggleAddCard && 'on-hover'} onMouseEnter={::this._toggleAddCardOn} onMouseLeave={::this._toggleAddCardOff}>
              <i className="material-icons">rowing</i>
            </a>
            {this.state.toggleAddCard &&
              <div className="add-card-modal" onMouseEnter={::this._toggleAddCardOn} onMouseLeave={::this._toggleAddCardOff}>
                <div className="input-section">
                  <input value={newTitle} type="text" className="form-control" onChange={(e) => { this.changeNewTitle(e.target.value); }} />
                </div>
                <div className="input-section">
                  <textarea value={newMessage} rows="4" cols="25" className="form-control" onChange={(e) => { this.changeNewMessage(e.target.value); }} />
                </div>
                <div className="add-card-button">
                  <a onClick={::this._addCard}>
                    <i className="fa fa-paper-plane" />
                  </a>
                </div>
              </div>
            }
          </li>
        </ul>
      </div>
    );
  }
}
Sidebar.propTypes = {
  addCard: PropTypes.func,
};

export default Sidebar;
// <input value={newMessage} type="text" className="form-control" onChange={(e) => { this.changeNewMessage(e.target.value); }} />
