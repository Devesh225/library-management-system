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

    console.log(data);

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFailure', payload: error.response.data.message });
  }
};
