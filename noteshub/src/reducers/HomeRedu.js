import { combineReducers } from 'redux';
import { initialState, changeState } from './../store/HomeStore';

const homeRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'GETDATA':
      return Object.assign({}, state, action.homeData);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, changeState);
    default:
      return state;
  }
}
/*const reducers = combineReducers({
  homeRedu
});
export default reducers;*/
export default homeRedu;