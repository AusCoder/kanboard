// import ReactDOM from "react-dom";

import React, { PropTypes, Component } from 'react';
import Draggable from 'react-draggable';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  toggleEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }
  render() {
    const { title, message, positionObj, editCb, delCb, moveCb } = this.props;
    const { isEdit } = this.state;
    return (
      <Draggable zIndex={positionObj.z} defaultPosition={{ x: positionObj.x, y: positionObj.y }} onStart={(e, d) => { moveCb({ x: d.x, y: d.y }); }} onStop={(e, d) => { moveCb({ x: d.x, y: d.y }); }} >
        <div className="card" >
          <div className="card-edit">
            <a onClick={() => delCb()}>delete</a>
          </div>
          <div className="card-edit">
            <a onClick={() => this.toggleEdit()}>edit</a>
          </div>
          <div className="card-title">
            {
              isEdit ?
                <input defaultValue={title} onChange={e => editCb(e.target.value, message)} />
              :
                title
            }
          </div>
          <div className="card-message">
            {
              isEdit ?
                <textarea defaultValue={message} rows="4" cols="15" onChange={e => editCb(title, e.target.value)} />
              :
                message
            }
          </div>
        </div>
      </Draggable>
    );
  }
}
Card.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  positionObj: PropTypes.object,
  editCb: PropTypes.func,
  delCb: PropTypes.func,
  moveCb: PropTypes.func,
};

export default Card;
