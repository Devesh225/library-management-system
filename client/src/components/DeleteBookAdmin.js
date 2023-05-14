import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { deleteBookAdmin } from '../redux/actions/organisationAction';
import DeleteBookCard from './DeleteBookCard';

const DeleteBookAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books } = useSelector(state => state.book);

  let selectedBook = null;
  books.map(book => {
    if (book._id === id) {
      selectedBook = book;
    }
    return selectedBook;
  });
  const deleteBookHandler = e => {
    dispatch(deleteBookAdmin(selectedBook._id));
    navigate(`/organisation/books`);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <DeleteBookCard book={selectedBook} />
      <Typography sx={{ marginTop: '1rem' }}>
        This Book Will Be Deleted.
      </Typography>
      <Button
        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        onClick={deleteBookHandler}
        variant="contained"
      >
        CONFIRM
      </Button>
    </div>
  );
};

export default DeleteBookAdmin;
