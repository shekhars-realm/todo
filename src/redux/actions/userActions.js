import {SET_ERRORS, LOADING_UI, SET_TODO, SET_UNAUTHENTICATED, SET_AUTHENTICATED, CLEAR_ERRORS, LOADING_USER, STOP_LOADING_USER, SET_USER, UNSET_TODO, STOP_LOADING_UI} from '../types';
import axios from 'axios';

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/signup', newUserData).then((res) => {
      console.log('res: ', res);
        setAuthorizationHeader(res.data.token);
        dispatch({type: SET_AUTHENTICATED});
        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });
        history.push('/');
      }).catch((err) => {
        console.log('err: ', err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
      });
}

export const getUserData = () => (dispatch) => {
  dispatch({type: LOADING_USER});
    axios.get('/user').then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_USER});
    }).catch((err) => {
        console.log(err);
    })
}

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData).then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch({type: SET_AUTHENTICATED});
        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });
        history.push('/');
      }).catch((err) => {
        console.log('err: ', err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
      });
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED
  })
}

export const addTodo = (todo) => (dispatch) => {
  dispatch({
    type: SET_TODO,
    payload: todo
  })
  axios.post('/addtodo', todo).then((res) => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  })
}

export const deleteTodo = (todo) => (dispatch) => {
  dispatch({type: LOADING_UI});
  dispatch({
    type: UNSET_TODO,
    payload: todo
  })
  axios.post('/removetodo', todo).then((res) => {
    dispatch({type: STOP_LOADING_UI});
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  })
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}
