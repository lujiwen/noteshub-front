const profileReducer = (state = {start_edit: false, end_edit: false }, action) => {
  switch (action.type) {
    case "EDIT_PROFILE":
      return {start_edit: true, end_edit: false }
    default:
      return state
  }
}

export default profileReducer