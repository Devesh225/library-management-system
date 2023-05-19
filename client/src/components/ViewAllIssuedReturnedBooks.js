import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewAllIssuedBooks,
  viewAllReturnedBooks,
} from '../redux/actions/bookAction';
import { Typography } from '@mui/material';
import IssueBookCard from './IssueBookCard';
import './Register.css';

const ViewAllIssuedReturnedBooks = ({ issued, returned }) => {
  const dispatch = useDispatch();
  const {
    issuedBooks,
    books,
    returnedBooks,
    borrowedBook,
    requestedIssueBooks,
    requestedReturnBooks,
  } = useSelector(state => state.book);

  useEffect(() => {
    if (issued) {
      dispatch(viewAllIssuedBooks());
    }
    if (returned) {
      dispatch(viewAllReturnedBooks());
    }
  }, [
    dispatch,
    issued,
    returned,
    borrowedBook,
    requestedIssueBooks,
    requestedReturnBooks,
  ]);
  return (
    <div
      className="register__main"
      style={{ height: '50rem', backgroundSize: '100%' }}
    >
      <div style={{ marginTop: '8%' }} className="signup-container">
        <Typography
          sx={{
            textAlign: 'center',
            color: 'orange',
            fontSize: '3rem',
            padding: '1rem',
          }}
        >
          {issued ? 'ISSUED BOOKS' : 'RETURNED BOOKS'}
        </Typography>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          marginBottom: '5rem',
          rowGap: '5rem',
          marginLeft: '10rem',
        }}
      >
        {requestedIssueBooks &&
          requestedIssueBooks.map(book => (
            <IssueBookCard
              requestedBook={true}
              bookDetails={book}
              key={book._id}
            />
          ))}
        {requestedReturnBooks &&
          requestedReturnBooks.map(book => (
            <IssueBookCard
              requestedBook={true}
              bookDetails={book}
              key={book._id}
            />
          ))}
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
