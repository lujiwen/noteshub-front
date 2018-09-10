import { initialState } from './../store/UserStore';

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_REDUCER':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEAR_REDUCER':
      return Object.assign({}, state, initialState);
      break
    case 'LOGIN':
      console.log("in Login reducer!")
      return Object.assign({}, state, action.data)
      break
    default:
      console.log(action.type)
      return state;
  }
}
/*const reducers = combineReducers({
  userRedu
});
export default reducers;*/
export default userReducer;