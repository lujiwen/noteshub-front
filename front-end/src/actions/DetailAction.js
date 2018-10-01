const getAvatarA = (dispatch, id) => {
  dispatch({
    type: 'GETDETAILAVATAR_SAGA',
    id
  });
}
export { getAvatarA };