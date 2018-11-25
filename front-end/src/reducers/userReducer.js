
export const initialState = {
  isLogin: false,
  isLoginPending: false,
  message: '',
  loginSucceed: false
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_REDUCER':
      return Object.assign({}, state, action.data);
      break;
    case 'CLEAR_REDUCER':
      return Object.assign({}, state, initialState);
      break
    case 'LOGIN':
      console.log(action.values.userName + "is logging !")
      return Object.assign({}, state, action.data)
      break
    case 'LOGIN_PENDING':
      return {isLogin: false, isLoginPending: true, message: "waiting for response"}
      break
    case 'LOGIN_FAILED':
      console.log("LOGIN_FAILED")
      return {isLogin: false, isLoginPending: false, message: action.payload, loginSucceed: false}
      break
    case 'LOGIN_SUCCEED':
      console.log("LOGIN_SUCCEED")
      return {isLogin: true, isLoginPending: false, message: action.payload, loginSucceed: true}
      break
    case 'SIGN_OUT':
      console.log("SIGN_OUT")
      return {isLogin: false, isLoginPending: false, message: action.payload}
      break
    default:
      return state;
  }
}

export default userReducer;