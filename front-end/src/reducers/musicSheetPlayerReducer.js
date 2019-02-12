const initialState = {
  isStartToPlay: false,
}

export default function musicSheetPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAY_SHEET':
      return {isStartToPlay : true}
    case 'STOP_SHEET':
      return {isStartToPlay : false}
    default:
      return state
  }
}    