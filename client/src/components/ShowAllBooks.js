import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllBooks } from '../redux/actions/bookAction';
import BookCard from './BookCard';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './Register.css';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ShowAllBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.book);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    dispatch(showAllBooks(keyword));
  }, [dispatch, keyword]);
  return (
    <div
      className="register__main"
      style={{ minHeight: '50rem', backgroundSize: '100%' }}
    >
      <div style={{ marginTop: '8%' }}>
        <div
          style={{
            width: '70%',
            backgroundColor: 'orange',
            margin: '0 auto',
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setKeyword(e.target.value)}
            />
          </Search>
        </div>
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
    </div>
  );
};

export default ShowAllBooks;
