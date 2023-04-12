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
        credentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
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

    console.log(data);

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

    console.log(data);

    dispatch({ type: 'loadUserSuccess', payload: data.organisation });
  } catch (error) {
    dispatch({ type: 'loadUserFailure', payload: error.response.data.message });
  }
};
