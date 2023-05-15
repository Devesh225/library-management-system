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
export const allMembers = () => async dispatch => {
  try {
    dispatch({ type: 'allMembersRequest' });

    const { data } = await axios.get(`${server}/organisation/allmembers`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'allMembersSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'allMembersFailure',
      payload: error.response.data.message,
    });
  }
};

export const addBookAdmin = formData => async dispatch => {
  try {
    dispatch({ type: 'addBookAdminRequest' });

    const { data } = await axios.post(
      `${server}/organisation/addbook`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'addBookAdminSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'addBookAdminFailure',
      payload: error.response.data.message,
    });
  }
};

export const updateBookAdmin = formData => async dispatch => {
  try {
    dispatch({ type: 'updateBookAdminRequest' });

    const { data } = await axios.put(
      `${server}/organisation/updatebook`,
      formData,
      {
        headers: { 'Content-type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateBookAdminSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'updateBookAdminFailure',
      payload: error.response.data.message,
    });
  }
};

export const getBookAdmin = id => async dispatch => {
  try {
    dispatch({ type: 'getBookAdminRequest' });

    const { data } = await axios.get(`${server}/organisation/book/${id}`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'getBookAdminSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getBookAdminFailure',
      payload: error.response.data.message,
    });
  }
};

export const deleteBookAdmin = bookID => async dispatch => {
  try {
    dispatch({ type: 'deleteBookAdminRequest' });

    const { data } = await axios.delete(
      `${server}/organisation/deletebook/${bookID}`,
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteBookAdminSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'deleteBookAdminFailure',
      payload: error.response.data.message,
    });
  }
};

export const getAllOrganisations = () => async dispatch => {
  try {
    dispatch({ type: 'allOrganisationsRequest' });

    const { data } = await axios.get(`${server}/organisation/all`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'allOrganisationsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'allOrganisationsFailure',
      payload: error.response.data.message,
    });
  }
};

export const updateOrganisationDetailsSuperAdmin =
  formData => async dispatch => {
    try {
      dispatch({ type: 'updateDetailsSuperAdminRequest' });

      const { data } = await axios.put(
        `${server}/updateorganisation`,
        formData,
        {
          headers: { 'Content-type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      dispatch({ type: 'updateDetailsSuperAdminSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'updateDetailsSuperAdminFailure',
        payload: error.response.data.message,
      });
    }
  };

export const deleteOrganisationSuperAdmin = id => async dispatch => {
  try {
    dispatch({ type: 'deleteSuperAdminRequest' });

    const { data } = await axios.delete(`${server}/deleteorganisation/${id}`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'deleteSuperAdminSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'deleteSuperAdminFailure',
      payload: error.response.data.message,
    });
  }
};

export const getOrgDetails = id => async dispatch => {
  try {
    dispatch({ type: 'orgDetailsRequest' });

    const { data } = await axios.get(`${server}/organisation/details/${id}`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'orgDetailsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'orgDetailsFailure',
      payload: error.response.data.message,
    });
  }
};

export const createOrganisationSuperAdmin = formData => async dispatch => {
  try {
    dispatch({ type: 'createOrganisationRequest' });

    const { data } = await axios.post(`${server}/organisation/new`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
      withCredentials: true,
    });

    dispatch({ type: 'createOrganisationSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'createOrganisationFailure',
      payload: error.response.data.message,
    });
  }
};
