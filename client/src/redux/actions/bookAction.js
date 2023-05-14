import { server } from '../store';
import axios from 'axios';

export const showAllBooks = () => async dispatch => {
  try {
    dispatch({ type: 'showAllBooksRequest' });

    const { data } = await axios.get(`${server}/book/all`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'showAllBooksSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'showAllBooksFailure',
      payload: error.response.data.message,
    });
  }
};

export const viewAllIssuedBooks = () => async dispatch => {
  try {
    dispatch({ type: 'viewAllIssuedBooksRequest' });

    const { data } = await axios.get(`${server}/member/allissuedbooks`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'viewAllIssuedBooksSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'viewAllIssuedBooksFailure',
      payload: error.response.data.message,
    });
  }
};

export const viewAllReturnedBooks = () => async dispatch => {
  try {
    dispatch({ type: 'viewAllReturnedBooksRequest' });

    const { data } = await axios.get(`${server}/member/allreturnedbooks`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'viewAllReturnedBooksSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'viewAllReturnedBooksFailure',
      payload: error.response.data.message,
    });
  }
};

export const issueBook = bookID => async dispatch => {
  try {
    dispatch({ type: 'issueBookRequest' });

    const { data } = await axios.post(
      `${server}/member/issuebook`,
      { bookID },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'issueBookSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'issueBookFailure',
      payload: error.response.data.message,
    });
  }
};

export const returnBook = bookID => async dispatch => {
  try {
    dispatch({ type: 'returnBookRequest' });

    const { data } = await axios.post(
      `${server}/member/returnbook`,
      { bookID },
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: 'returnBookSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'returnBookFailure',
      payload: error.response.data.message,
    });
  }
};

export const viewAllRecommendedBooks = () => async dispatch => {
  try {
    dispatch({ type: 'viewAllRecommendedBooksRequest' });

    const { data } = await axios.get(`${server}/member/recommendedbooks`, {
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
    });

    dispatch({ type: 'viewAllRecommendedBooksSuccess', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'viewAllRecommendedBooksFailure',
      payload: error.response.data.message,
    });
  }
};
