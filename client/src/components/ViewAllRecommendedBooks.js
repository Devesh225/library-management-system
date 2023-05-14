import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from './BookCard';
import { viewAllRecommendedBooks } from '../redux/actions/bookAction';

const ViewAllRecommendedBooks = () => {
  const dispatch = useDispatch();
  const { recommendedBooks } = useSelector(state => state.book);
  useEffect(() => {
    dispatch(viewAllRecommendedBooks());
  }, [dispatch]);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {recommendedBooks &&
        recommendedBooks.map(book => <BookCard book={book} key={book?._id} />)}
    </div>
  );
};

export default ViewAllRecommendedBooks;
