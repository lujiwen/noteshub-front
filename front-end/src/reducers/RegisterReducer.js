
export const initialState = {
  isRegister: false,
  isRegisterPending: false,
  message: '',
  registerSucceed: false
}

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_SUCCEED':
      return {isRegister: true, isRegisterPending: false, registerSucceed : true}
      break
    case 'REGISTER_FAILED':
      return {isRegister: true, isRegisterPending: true, registerSucceed : false}
      break
    default:
      return state;
  }
}

export default registerReducer;

