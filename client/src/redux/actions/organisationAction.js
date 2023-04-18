import { server } from '../store';
import axios from 'axios';

export const organisationLogin = (id, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/organisation/login`,
      { id, password },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'loginFailure', payload: error.response.data.message });
  }
};

export const organisationRegister = formData => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/organisation/new`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFailure', payload: error.response.data.message });
  }
};

export const organisationLoadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`${server}/organisation/me`, {
      withCredentials: true,
    });

    dispatch({ type: 'loadUserSuccess', payload: data.organisation });
  } catch (error) {
    dispatch({ type: 'loadUserFailure', payload: error.response.data.message });
  }
};

export const organisationLogout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/organisation/logout`, {
      withCredentials: true,
    });

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFailure', payload: error.mesage });
  }
};

export const updateOrganisationDetails = formData => async dispatch => {
  try {
    dispatch({ type: 'updateDetailsRequest' });

    const { data } = await axios.put(
      `${server}/organisation/update`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateDetailsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'updateDetailsFailure',
      payload: error.response.data.message,
    });
  }
};

export const updateOrganisationPassword =
  (oldPassword, newPassword, confirmPassword) => async dispatch => {
    try {
      dispatch({ type: 'updatePasswordRequest' });

      const { data } = await axios.put(
        `${server}/organisation/updatepassword`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true,
        }
      );

      dispatch({ type: 'updatePasswordSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'updatePasswordFailure',
        payload: error.response.data.message,
      });
    }
  };

export const forgotPasswordOrganisation = email => async dispatch => {
  try {
    dispatch({ type: 'forgotPasswordRequest' });

    const { data } = await axios.post(
      `${server}/organisation/forgotpassword`,
      { email },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'forgotPasswordSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'forgotPasswordFailure',
      payload: error.response.data.message,
    });
  }
};

export const resetPasswordOrganisation =
  (token, password) => async dispatch => {
    try {
      dispatch({ type: 'resetPasswordRequest' });

      const { data } = await axios.put(
        `${server}/organisation/resetpassword/${token}`,
        { password },
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true,
        }
      );

      dispatch({ type: 'resetPasswordSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'resetPasswordFailure',
        payload: error.response.data.message,
      });
    }
  };

export const addMember = formData => async dispatch => {
  try {
    dispatch({ type: 'addMemberRequest' });

    const { data } = await axios.post(
      `${server}/organisation/addmember`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'addMemberSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'addMemberFailure',
      payload: error.response.data.message,
    });
  }
};

export const removeMember = email => async dispatch => {
  try {
    dispatch({ type: 'removeMemberRequest' });

    const { data } = await axios.delete(`${server}/organisation/removemember`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
      data: { email },
    });

    dispatch({ type: 'removeMemberSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'removeMemberFailure',
      payload: error.response.data.message,
    });
  }
};
