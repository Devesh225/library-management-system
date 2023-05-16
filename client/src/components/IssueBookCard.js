import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { issueBook, returnBook } from '../redux/actions/bookAction';

const IssueBookCard = ({ issueDetails, bookDetails }) => {
  const { loading } = useSelector(state => state.book);
  React.useEffect(() => {
    if (!loading) {
      setBookID(bookDetails?._id);
    }
  }, [loading, bookDetails?._id]);

  const navigate = useNavigate();
  const [bookID, setBookID] = React.useState('');
  const dispatch = useDispatch();
  const returnBookHandler = e => {
    dispatch(returnBook(bookID));
    navigate('/book/returned');
  };
  const reissueBookHandler = e => {
    dispatch(issueBook(bookID));
    navigate('/book/issued');
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
          image={bookDetails?.book_cover?.url}
          alt={bookDetails?.book_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bookDetails?.book_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {bookDetails?.book_author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher: {bookDetails?.book_publisher},{' '}
            {bookDetails?.book_year_of_publication}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Subject: {bookDetails?.book_subject}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of Pages: {bookDetails?.book_number_of_pages}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Issue Date:{' '}
            {(issueDetails?.borrowedBook_borrowed_date).substring(0, 10)}
          </Typography>
          {issueDetails?.borrowedBook_is_returned ? (
            <Typography variant="body2" color="text.secondary">
              Returned Date:{' '}
              {(issueDetails?.borrowedBook_returned_date).substring(0, 10)}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Max Return Date:{' '}
              {(issueDetails?.borrowedBook_due_date).substring(0, 10)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {issueDetails?.borrowedBook_is_returned ? (
          <Button onClick={reissueBookHandler} size="small" color="primary">
            REISSUE BOOK
          </Button>
        ) : (
          <Button onClick={returnBookHandler} size="small" color="primary">
            RETURN BOOK
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default IssueBookCard;
