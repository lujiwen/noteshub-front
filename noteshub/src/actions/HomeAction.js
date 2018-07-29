const getData = (dispatch, count) => {
  dispatch({
    type:'GETDATA_SAGA',
    count
  });
}

const userClick = (dispatch, data, id, num) => {
  dispatch({
    type: 'CLICK_SAGA',
    data,
    id,
    num
  });
}

const clear = (dispatch) => {
  dispatch({
    type: 'CLEARREDU'
  });
}

export { getData, userClick, clear };