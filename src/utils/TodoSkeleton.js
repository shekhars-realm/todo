import React from 'react';
import PropTypes from 'prop-types'
import './TodoSkeleton.sass'

class TodoSkeleton extends React.Component {

  render() {
    return (
      <div className="todos collection">
        <div className="line">
          <span></span>
        </div>
        <div className="line">
          <span></span>
        </div>
        <div className="line">
          <span></span>
        </div>
        <div className="line">
          <span></span>
        </div>
      </div>
    )
  }
}


export default TodoSkeleton;
