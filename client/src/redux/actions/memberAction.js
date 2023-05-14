import { server } from '../store';
import axios from 'axios';

export const memberLogin = (orgId, id, password) => async dispatch => {
  try {
    dispatch({ type: 'memberLoginRequest' });

    const { data } = await axios.post(
      `${server}/member/login`,
      { orgId, id, password },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'memberLoginSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'memberLoginFailure',
      payload: error.response.data.message,
    });
  }
};

export const memberLoadUser = () => async dispatch => {
  try {
    dispatch({ type: 'memberLoadUserRequest' });

    const { data } = await axios.get(`${server}/member/me`, {
      withCredentials: true,
    });

    dispatch({ type: 'memberLoadUserSuccess', payload: data.member });
  } catch (error) {
    dispatch({
      type: 'memberLoadUserFailure',
      payload: error.response.data.message,
    });
  }
};

export const memberLogout = () => async dispatch => {
  try {
    dispatch({ type: 'memberLogoutRequest' });

    const { data } = await axios.get(`${server}/member/logout`, {
      withCredentials: true,
    });

    dispatch({ type: 'memberLogoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'memberLogoutFailure', payload: error.mesage });
  }
};

export const updateMemberDetails = formData => async dispatch => {
  try {
    dispatch({ type: 'updateMemberDetailsRequest' });

    const { data } = await axios.put(
      `${server}/member/updateprofile`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateMemberDetailsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'updateMemberDetailsFailure',
      payload: error.response.data.message,
    });
  }
};

export const updateMemberPassword =
  (oldPassword, newPassword, confirmPassword) => async dispatch => {
    try {
      dispatch({ type: 'updateMemberPasswordRequest' });

      const { data } = await axios.put(
        `${server}/member/updatepassword`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true,
        }
      );

      dispatch({ type: 'updateMemberPasswordSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'updateMemberPasswordFailure',
        payload: error.response.data.message,
      });
    }
  };

export const forgotPasswordMember = email => async dispatch => {
  try {
    dispatch({ type: 'memberForgotPasswordRequest' });

    const { data } = await axios.post(
      `${server}/member/forgotpassword`,
      { email },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'memberForgotPasswordSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'memberForgotPasswordFailure',
      payload: error.response.data.message,
    });
  }
};

export const resetPasswordMember = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'memberResetPasswordRequest' });

    const { data } = await axios.put(
      `${server}/member/resetpassword/${token}`,
      { password },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'memberResetPasswordSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'memberResetPasswordFailure',
      payload: error.response.data.message,
    });
  }
};
