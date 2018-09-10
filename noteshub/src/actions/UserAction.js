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
  dispatch({
    type:'LOGIN',
    values
  });
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