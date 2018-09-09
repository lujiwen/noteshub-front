import { initialState } from './../store/UserStore';

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_REDUCER':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEAR_REDUCER':
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
/*const reducers = combineReducers({
  userRedu
});
export default reducers;*/
export default userReducer;