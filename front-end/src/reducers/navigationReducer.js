let initState = { visible: false, placement: 'left', toUpload: false, toPersonalPage: false, isSignOut: false}
const navigationReducer = (state = initState, action) => {
  switch(action.type) {
    case "TOGGLE_LEFT_DRAWER":
      console.log("navigationReducer: TOGGLE_LEFT_DRAWER")
      return { visible: ! state.visible, placement: 'left', toUpload: false}
    case "REDIRECT_TO_UPLOAD":
      return {visible: ! state.visible, placement: 'left', toUpload: true}
    case "REDIRECT_TO_PERSONAL_PAGE":
      return {visible: ! state.visible, placement: 'left', toUpload: false, toPersonalPage: true}
    case "SIGN_OUT":
      console.log("sign out !")
      return {visible: state.visible, placement: 'left', toUpload: false, toPersonalPage: false, isSignOut: true}
    default:
      return state
  }
}

export default navigationReducer;