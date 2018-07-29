import { combineReducers } from 'redux';
import { initialState } from './../store/DetailStore';

const settingRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'DETAILREDU':
      return Object.assign({}, state, action.data);
    break;
    default:
      return state;
  }
}
export default settingRedu;