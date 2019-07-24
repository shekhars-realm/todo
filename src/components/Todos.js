import React from 'react';
import PropTypes from 'prop-types'
import TodoSkeleton from '../utils/TodoSkeleton'
//redux imports
import {connect} from 'react-redux';
import {deleteTodo, getUserData} from '../redux/actions/userActions'

class Todos extends React.Component {

  componentDidMount() {
    this.props.getUserData()
  }

  deleteTodo = (todo) => {
    this.props.deleteTodo({todo})
  }
  render() {
    const {todos, loading, loadingUser} = this.props
    console.log('in todo: ',this.props);
    const todoList = loadingUser ? <TodoSkeleton/> : (
      todos.length ? (
        todos.map((todo,index) => {
          return (
            <div className="collection-item" key={todo.index} onClick={() => {this.deleteTodo(todo)}}>
              <span>{todo}</span>
            </div>
          )
        })
      ) : (
        <p className="center">{"You have no todo's left, yay!"}</p>
      )
    )
    return (
      <div className="todos collection">
        {todoList}
      </div>
    )
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingUser: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  todos: state.user.todos,
  loading: state.UI.loading,
  loadingUser: state.user.loading
})

export default connect(mapStateToProps, {deleteTodo, getUserData})(Todos);
