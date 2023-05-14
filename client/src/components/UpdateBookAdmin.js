import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Register.css';
import { useState } from 'react';
import AboutAvatar from './AboutAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookAdmin } from '../redux/actions/organisationAction';
import { useNavigate, useParams } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Libraly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
    fontSize: 15,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#fb8500',
    },
  },
});

const UpdateBookAdmin = () => {
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

  const [title, setTitle] = useState(selectedBook.book_title);
  const [author, setAuthor] = useState(selectedBook.book_author);
  const [publisher, setPublisher] = useState(selectedBook.book_publisher);
  const [yop, setYop] = useState(selectedBook.book_year_of_publication);
  const [isbn, setIsbn] = useState(selectedBook.book_isbn);
  const [nop, setNop] = useState(selectedBook.book_number_of_pages);
  const [availableCount, setAvailableCount] = useState(
    selectedBook.book_available_copies
  );
  const [totalCapacity, setTotalCapacity] = useState(
    selectedBook.book_total_copies
  );
  const [subject, setSubject] = useState(selectedBook.book_subject);
  const [coverPreview, setCoverPreview] = useState(
    selectedBook.book_cover?.url
  );
  const [cover, setCover] = useState();

  const coverChangeHandler = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        setCover(file);
      };
    }
  };

  const updateBookSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('author', author);
    myForm.append('publisher', publisher);
    myForm.append('yop', yop);
    myForm.append('isbn', isbn);
    myForm.append('nop', nop);
    myForm.append('availableCount', availableCount);
    myForm.append('totalCapacity', totalCapacity);
    myForm.append('subject', subject);
    myForm.append('file', cover);
    dispatch(updateBookAdmin(myForm));
    navigate('/organisation/books');
  };

  return (
    <div className="register__main">
      <div className="signup-container">
        <ThemeProvider theme={theme}>
          <Container component="main">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                className="signup-heading"
                sx={{ mt: 5, mb: 2, color: 'primary.main' }}
              >
                Update Book Organisation
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={updateBookSubmitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AboutAvatar avatar={coverPreview} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="title"
                      placeholder="Book Title"
                      name="title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      value={author}
                      id="author"
                      placeholder="Book Author"
                      name="author"
                      onChange={e => setAuthor(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      value={publisher}
                      size="small"
                      id="publisher"
                      placeholder="Publisher Name"
                      name="publisher"
                      onChange={e => setPublisher(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      value={yop}
                      name="yop"
                      placeholder="Year of Publication"
                      type="number"
                      id="yop"
                      onChange={e => setYop(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      required
                      fullWidth
                      name="isbn"
                      value={isbn}
                      placeholder="ISBN Number"
                      onChange={e => setIsbn(e.target.value)}
                      id="isbn"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      required
                      value={nop}
                      fullWidth
                      name="nop"
                      type="number"
                      placeholder="Number of Pages"
                      onChange={e => setNop(e.target.value)}
                      id="nop"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      required
                      value={availableCount}
                      type="number"
                      fullWidth
                      name="availableCount"
                      placeholder="Available Copies"
                      onChange={e => setAvailableCount(e.target.value)}
                      id="availableCount"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      required
                      value={totalCapacity}
                      type="number"
                      fullWidth
                      name="totalCapacity"
                      placeholder="Total Copies"
                      onChange={e => setTotalCapacity(e.target.value)}
                      id="totalCapacity"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      value={subject}
                      required
                      fullWidth
                      name="subject"
                      placeholder="Subject"
                      onChange={e => setSubject(e.target.value)}
                      id="subject"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'white', textAlign: 'center' }}>
                      Choose Book Cover
                    </Typography>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      type="file"
                      accept="image/*"
                      id="coverPreview"
                      placeholder="Book Cover"
                      name="coverPreview"
                      autoComplete="Cover"
                      onChange={coverChangeHandler}
                    />
                  </Grid>
                </Grid>
                <Button
                  className="signup-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgColor: 'primary.main',
                    borderRadius: '15px',
                    color: 'common.white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  Update Book
                </Button>
                <Grid
                  sx={{
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                ></Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2, pb: 5, color: 'primary.main' }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default UpdateBookAdmin;
