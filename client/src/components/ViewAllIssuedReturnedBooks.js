import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewAllIssuedBooks,
  viewAllReturnedBooks,
} from '../redux/actions/bookAction';
import IssueBookCard from './IssueBookCard';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '8%',
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
  );
};

export default ViewAllIssuedReturnedBooks;
