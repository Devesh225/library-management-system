import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewAllIssuedBooks,
  viewAllReturnedBooks,
} from '../redux/actions/bookAction';
import IssueBookCard from './IssueBookCard';
import './Register.css';

const ViewAllIssuedReturnedBooks = ({ issued, returned }) => {
  const dispatch = useDispatch();
  const { issuedBooks, books, returnedBooks, borrowedBook } = useSelector(
    state => state.book
  );

  useEffect(() => {
    if (issued) {
      dispatch(viewAllIssuedBooks());
    }
    if (returned) {
      dispatch(viewAllReturnedBooks());
    }
  }, [dispatch, issued, returned, borrowedBook]);
  return (
    <div className="register__main" style={{ height: '50rem' }}>
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
        {issued
          ? issuedBooks &&
            issuedBooks.map((book, index) => (
              <IssueBookCard
                issueDetails={book}
                bookDetails={books[index]}
                key={book._id}
              />
            ))
          : returnedBooks &&
            returnedBooks.map((book, index) => (
              <IssueBookCard
                issueDetails={book}
                bookDetails={books[index]}
                key={book._id}
              />
            ))}
      </div>
    </div>
  );
};

export default ViewAllIssuedReturnedBooks;
