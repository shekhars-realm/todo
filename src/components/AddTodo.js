import React, { Component } from 'react'
import PropTypes from 'prop-types';
//mui imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//redux imports
import {connect} from 'react-redux';
import {addTodo, logoutUser} from '../redux/actions/userActions';

class AddTodo extends Component {
  state = {
    errors: {},
    todo: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // call function to add a todo
    if(this.state.todo === '') {
      this.setState({
        errors: {
          todo: "Can't leave empty!"
        }
      })
    } else if(this.props.todos.includes(this.state.todo)) {
      this.setState({
        errors: {
          todo: "Todo already exist!"
        }
      })
    } else {
      this.props.addTodo({todo: this.state.todo});
    }
    this.setState({
      todo: ''
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="todo"
            fullWidth
            type="text"
            className="textField"
            label="Todo"
            placeholder="What's in your mind!"
            value={this.state.todo}
            onChange={this.handleChange}
            error={this.state.errors.todo ? true : false}
            helperText={this.state.errors.todo}
            margin="normal"
            variant="outlined"
          />
        </form>
        <Button variant="contained" color="secondary" onClick={this.props.logoutUser} className="logoutBtn">
          {"Logout"}
        </Button>
      </div>
    )
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  todos: state.user.todos
})


export default connect(mapStateToProps, {addTodo, logoutUser})(AddTodo)
