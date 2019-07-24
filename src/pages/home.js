import React, { Component, Fragment } from 'react';
import Todos from '../components/Todos'
import AddTodo from '../components/AddTodo'
import PropTypes from 'prop-types'
//mui imports
import Button from '@material-ui/core/Button';
//redux imports
import {connect} from 'react-redux';

class Home extends Component {

  render() {
    const {authenticated, handle} = this.props;
    console.log(authenticated);
    return (
      <Fragment>
        {
          authenticated ?
          <div className="todo-app container">
          <img src="/Images/todo.png" className="todoImg" alt="Todo"/>
          <Button variant="contained" color="secondary" className="logoutBtn">
            {"Logout"}
          </Button>
          <h3>{`Hi, ${handle}`}</h3>
          <Todos/>
          <AddTodo/>
          </div>
          :
          this.props.history.push('/login')
        }
        </Fragment>
    );
  }
}

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  handle: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  handle: state.user.handle
})

export default connect(mapStateToProps)(Home);
