import axios from "axios";

const fetchTabData = (dispatch, chooseTabNumber) => {
  console.log("fetch data "+ chooseTabNumber)
  switch (chooseTabNumber) {
    case 0:
      fetchOverview(dispatch)
  }
}

const fetchOverview = (dispatch) => {
  let token = localStorage.getItem("token")
  axios.get("http://127.0.0.1:8080/sheets", {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Token": `${token}`
    }
  })
  .then(function (response) {
    console.log("success:" + response)
    dispatch({
      type:'FETCH_SHEETS_OVERVIEW_SUCCEED',
      payload: response.data
    });
  })
  .catch((err) => {
    console.log("failed :" + err)
    dispatch({
      type:'FETCH_SHEETS_OVERVIEW_FAILED',
      payload: err
    });
  })
}

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
export { getAvatarA, uploadImagesA, uploadAvatarA, getImagesA, signOutA, fetchTabData };