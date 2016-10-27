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

  render() {
    return (
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <a href="#" onMouseEnter={::this._toggleAddCardOn} onMouseLeave={::this._toggleAddCardOff}>
              <i className="material-icons">rowing</i>
            </a>
            {this.state.toggleAddCard &&
              <div className="add-card-modal">
                appeared!
              </div>
            }
          </li>
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
    );
  }
}
Sidebar.propTypes = {
  addCard: PropTypes.func,
};

export default Sidebar;
