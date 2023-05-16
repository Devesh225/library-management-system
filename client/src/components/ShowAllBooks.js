import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllBooks } from '../redux/actions/bookAction';
import BookCard from './BookCard';
import './Register.css';

const ShowAllBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.book);
  useEffect(() => {
    dispatch(showAllBooks());
  }, [dispatch]);
  return (
    <div className="register__main">
      <div
        style={{
          display: 'grid',
          marginTop: '8%',
          gridTemplateColumns: '1fr 1fr 1fr',
          marginBottom: '5rem',
          rowGap: '5rem',
          marginLeft: '10rem',
        }}
      >
        {books && books.map(book => <BookCard book={book} key={book?._id} />)}
      </div>
    </div>
  );
};

export default ShowAllBooks;
