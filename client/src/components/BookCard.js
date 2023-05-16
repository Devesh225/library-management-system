import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { issueBook } from '../redux/actions/bookAction';
import { useNavigate } from 'react-router-dom';
import { getBookAdmin } from '../redux/actions/organisationAction';

const BookCard = ({ book }) => {
  const { loading } = useSelector(state => state.book);
  const { organisation } = useSelector(state => state.organisation);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!loading) {
      setBookID(book._id);
    }
  }, [loading, book._id]);
  const [bookID, setBookID] = React.useState('');

  const navigate = useNavigate();
  const issueBookHandler = e => {
    dispatch(issueBook(bookID));
    navigate('/book/issued');
  };
  const updateBookHandler = e => {
    dispatch(getBookAdmin(bookID));
    navigate(`/organisation/book/update/${bookID}`);
  };
  const deleteBookHandler = e => {
    navigate(`/organisation/book/delete/${bookID}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        backgroundColor: 'orange',
        borderRadius: '5%',
        border: '5px solid orange',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={book?.book_cover?.url}
          alt={book?.book_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book?.book_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book?.book_author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher: {book?.book_publisher}, {book?.book_year_of_publication}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Subject: {book?.book_subject}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of Pages: {book?.book_number_of_pages}
          </Typography>
          {organisation ? (
            <Typography variant="body2" color="text.secondary">
              Available Copies: {book?.book_available_copies}
            </Typography>
          ) : null}
          {organisation ? (
            <Typography variant="body2" color="text.secondary">
              Total Capacity: {book?.book_total_copies}
            </Typography>
          ) : null}
          {organisation ? (
            <Typography variant="body2" color="text.secondary">
              Waiting: {book?.book_waiting_queue}
            </Typography>
          ) : null}
          {book?.book_available_copies === 1 ? (
            <Typography variant="body2" color="text.secondary">
              <b>NO COPIES AVAILABLE CURRENTLY.</b>
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {book?.book_available_copies === 1 ? (
          <Button onClick={issueBookHandler} size="small" color="primary">
            ADD TO WAITLIST
          </Button>
        ) : organisation ? (
          <Grid sx={{ margin: 'auto' }}>
            <Button
              onClick={updateBookHandler}
              size="small"
              color="primary"
              variant="contained"
              sx={{ marginRight: '5rem' }}
            >
              UPDATE
            </Button>
            <Button
              onClick={deleteBookHandler}
              size="small"
              color="primary"
              variant="contained"
            >
              DELETE
            </Button>
          </Grid>
        ) : (
          <Button
            onClick={issueBookHandler}
            size="small"
            color="primary"
            variant="contained"
          >
            ISSUE BOOK
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
