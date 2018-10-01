let initState = { visible: false, placement: 'left' }
const navigationReducer = (state = initState, action) => {
  switch(action.type) {
    case "TOGGLE_LEFT_DRAWER":
      console.log("navigationReducer: TOGGLE_LEFT_DRAWER")
      return { visible: ! state.visible, placement: 'left'}
    default:
      return state
  }
}

export default navigationReducer;