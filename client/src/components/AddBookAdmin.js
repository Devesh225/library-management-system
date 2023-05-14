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
import defaultCover from '../assets/defaultCover.jpg';
import AboutAvatar from './AboutAvatar';
import { useDispatch } from 'react-redux';
import { addBookAdmin } from '../redux/actions/organisationAction';
import { useNavigate } from 'react-router-dom';

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

const AddBookAdmin = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [yop, setYop] = useState('');
  const [isbn, setIsbn] = useState('');
  const [nop, setNop] = useState('');
  const [availableCount, setAvailableCount] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');
  const [subject, setSubject] = useState('');
  const [coverPreview, setCoverPreview] = useState(defaultCover);
  const [cover, setCover] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addBookSubmitHandler = e => {
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
    dispatch(addBookAdmin(myForm));
    navigate(`/organisation/books`);
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
                Add Book Organisation
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={addBookSubmitHandler}
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
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
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
                  Add Book
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

export default AddBookAdmin;
