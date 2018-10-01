import axios from 'axios'

const register = (dispatch, values) => {
  dispatch({
    type:'REGISTER_SAGA',
    values
  });
}

const clear = (dispatch) => {
  dispatch({
    type:'CLEARREDU'
  });
}

const updatePassword = (dispatch, values) => {
  dispatch({
    type:'UPDATEPASSWORD_SAGA',
    values
  });
}

const login = (dispatch, values) => {
  let data = JSON.stringify({
    username: values.userName,
    password: values.password
  })

  axios.post("http://127.0.0.1:8080/login", data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
  .then(function (response) {
      console.log("success:" + response)
      dispatch({
        type:'LOGIN_SUCCEED',
        payload: response.data
      });
  })
  .catch((err) => {
    console.log("failed :" + err)
    dispatch({
      type:'LOGIN_FAILED',
      payload: err
    });
  })

}


export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

export const signIn = (token) => {
  localStorage.setItem('token', token);
  return { type: AUTH_SIGNIN };
};

export const signOut = () => {
  localStorage.removeItem('token');
  return { type: AUTH_SIGNOUT };
};

export { register, clear, updatePassword, login };