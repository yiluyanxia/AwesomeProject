import todos from './todos';
import { combineReducers } from 'redux';

const todoApp = combineReducers({
    todos
});

export default todoApp