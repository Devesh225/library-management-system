import { server } from '../store';
import axios from 'axios';

export const createOrganisationSubscription = plan => async dispatch => {
  try {
    dispatch({ type: 'createSubscriptionRequest' });

    const { data } = await axios.post(
      `${server}/organisation/subscribe`,
      { plan },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'createSubscriptionSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'createSubscriptionFailure',
      payload: error.response.data.message,
    });
  }
};
