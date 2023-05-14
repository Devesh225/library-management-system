import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllBooks } from '../redux/actions/bookAction';
import BookCard from './BookCard';

const ShowAllBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.book);
  useEffect(() => {
    dispatch(showAllBooks());
  }, [dispatch]);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {books && books.map(book => <BookCard book={book} key={book?._id} />)}
    </div>
  );
};

export default ShowAllBooks;
