
const personalTabReducer = (state = {sheets: []}, action) => {
  switch(action.type) {
    case "FETCH_SHEETS_OVERVIEW_SUCCEED":
      return {sheets: action.payload}
    default:
      return state
  }
}

export default personalTabReducer