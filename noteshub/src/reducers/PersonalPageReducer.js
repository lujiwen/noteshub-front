
const personalPageReducer = (state = {chooseTabNumber: 1}, action) => {
  switch(action.type) {
    case "OVERVIEW":
      return {chooseTabNumber: 0}
    case "MY_SHEET":
      return {chooseTabNumber: 1}
    case "MY_FAVOURITE":
      return {chooseTabNumber: 2}
    case "FOLLOWING":
      return {chooseTabNumber: 3}
    case "FOLLOWED":
      return {chooseTabNumber: 4}
    default:
      return state
  }
}

export default personalPageReducer