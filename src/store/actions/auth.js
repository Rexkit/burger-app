import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId
});

export const authFail = (err) => ({
  type: actionTypes.AUTH_FAIL,
  error: err
});

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
}

export const auth = (email, pswrd, isSignup) => (dispatch => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: pswrd,
    returnSecureToken: true
  }
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFzzoDwfEaiKNOds9_Qxyi9rDMifg6gRg';
  if (!isSignup) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDFzzoDwfEaiKNOds9_Qxyi9rDMifg6gRg';
  }
  axios.post(url, authData)
    .then(res => {
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    });
});