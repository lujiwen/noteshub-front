const initialState = {
  viewSheet:false,
  sheetId : 0,
  isOutdated:false,
  uploadSheet: false,
  uploadedSucceed: false
}

export default function sheetReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SHEET':
      return {isOutdated : false }
    case 'SET_INTRO':
      return {isOutdated : true }
    case 'SET_ENDING':
      return {isOutdated : true }
    case 'SET_PATTERN':
      return {isOutdated : true }
    case 'ADD_SECTION':
      return {isOutdated : true }
    case 'REMOVE_SECTION':
      return {isOutdated : true }  
    case 'SET_KEY':
      return {isOutdated : true }
    case 'SET_SCALE':
      return {isOutdated : false }  
    case 'REMOVE_ALL':
      return {isOutdated : false }
    case 'CLONE_SECTION':
      return {isOutdated : true }
    case 'MOVE_SECTION':
      return {isOutdated : true }
    case 'VIEW_SHEET':
      return { viewSheet: true , sheetInfo: {} , sheetId : action.sheetId}
    case 'DOWNLOAD_SHEET_BY_ID_SUCCEED':
      return { viewSheet: true , sheetInfo: action.payload }
    case 'DOWNLOAD_SHEET_BY_ID_FAILED':
      return { viewSheet: true , sheetInfo: {} }
    case 'UPLOAD_SHEET':
      console.log("start to upload sheet! ")
      return {uploadSheet: true, data: action.values}
    case 'UPLOAD_SUCCEED':
      return {uploadSheet: true, uploadedSucceed: true}
    default:
      return state
  }
}    