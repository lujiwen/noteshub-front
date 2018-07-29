const getAvatarA = (dispatch, count) => {
  dispatch({
    type:'GETAVATAR_SAGA',
    count
  });
}

const uploadImagesA = (dispatch, formData, count) => {
  dispatch({
    type: 'UPLOADIMAGES_SAGA',
    formData,
    count
  });
}

const uploadAvatarA = (dispatch, formData) => {
  dispatch({
    type: 'UPLOADAVATAR_SAGA',
    formData
  });
}

const getImagesA = (dispatch, count) => {
  dispatch({
    type: 'GETIMAGES_SAGA',
    count
  });
}

const signOutA = (dispatch) => {
  dispatch({
    type: 'SIGNOUT_SAGA'
  }); 
}
export { getAvatarA, uploadImagesA, uploadAvatarA, getImagesA, signOutA };