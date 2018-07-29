const passwordChangeA = (dispatch, values) => {
  dispatch({
    type:'PASSWORDCHANGE_SAGA',
    values
  });
}

const getAvatarA = (dispatch) => {
  dispatch({
    type: 'GETSETTINGAVATAR_SAGA'
  });
}

const clear = (dispatch) => {
  dispatch({
    type:'CLEARREDU'
  });
}
export { passwordChangeA, getAvatarA, clear };