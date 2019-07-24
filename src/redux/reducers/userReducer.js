import {SET_USER, SET_ERRORS, STOP_LOADING_USER, CLEAR_ERRORS, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SHOUT, UNLIKE_SHOUT, MARK_NOTIFICATIONS_READ, SET_TODO, UNSET_TODO} from '../types';

const initialState = {
  authenticated: false,
  loading: true,
  handle: '',
  todos: []
}

export default function(state=initialState, action) {
  let index;
  switch (action.type) {
    case SET_AUTHENTICATED:
        return {
            ...state,
            authenticated: true
        };
    case SET_UNAUTHENTICATED:
        return initialState;
    case LOADING_USER:
      return {
        loading: true,
        ...state
      }
    case STOP_LOADING_USER:
      return {
        loading: false,
        ...state
      }
    case SET_USER:
        return {
            authenticated: true,
            handle: action.payload.handle,
            todos: action.payload.todos
        };
    case SET_TODO:
      return {
        ...state,
        todos: [action.payload.todo, ...state.todos]
      }
    case UNSET_TODO:
      index = state.todos.findIndex(todo => todo === action.payload.todo);
      state.todos.splice(index, 1);
      console.log(state, action.payload);
      return {
        ...state
      }
    default:
      return state
  }
}
