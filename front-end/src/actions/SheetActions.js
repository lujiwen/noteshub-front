import axios from 'axios'

const startToUploadSheet = (dispatch, values) => {
  console.log("start to upload sheets :" + values)
  let data = JSON.stringify({
    song: values.song,
    composer: values.composer,
    lyricist: values.lyricist,
    arranger: values.arranger,
    scorer: values.scorer,
    sheetPath: values.sheetPath,
    sheetType: values.sheetType,
    sheets : values.sheets
  })

  axios.post("http://127.0.0.1:8080/uploadSheetAndInfo", data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
      .then(function (response) {
        console.log("success:" + response)
        dispatch({
          type:'UPLOAD_SUCCEED',
          payload: response.data
        });
      })
      .catch((err) => {
        console.log("failed :" + err)
        dispatch({
          type:'UPLOAD_FAILED',
          payload: err
        });
      })
}

export {startToUploadSheet}