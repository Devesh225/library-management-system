import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DeleteBookCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
          <Typography variant="body2" color="text.secondary">
            Available Copies: {book?.book_available_copies}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DeleteBookCard;
