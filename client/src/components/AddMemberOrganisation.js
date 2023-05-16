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
import defaultAvatar from '../assets/defaultAvatar.png';
import AboutAvatar from './AboutAvatar';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/actions/organisationAction';
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

const AddMemberOrganisation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();

  const avatarChangeHandler = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
    }
  };
  const navigate = useNavigate();
  const addMemberFormSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('user_name', name);
    myForm.append('user_email', email);
    myForm.append('user_phone', phone);
    myForm.append('user_dob', dob);
    myForm.append('file', avatar);
    dispatch(addMember(myForm));
    window.location.reload();
    navigate('/organisation/allmembers');
  };

  return (
    <div className="register__main" style={{ backgroundSize: '100%' }}>
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
                Add Member
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={addMemberFormSubmitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AboutAvatar avatar={avatarPreview} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="name"
                      placeholder="Member Name"
                      name="name"
                      onChange={e => setName(e.target.value)}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      name="phone"
                      placeholder="Phone"
                      type="number"
                      id="phone"
                      autoComplete="Phone"
                      onChange={e => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      size="small"
                      required
                      fullWidth
                      name="dob"
                      placeholder="Date Of Birth (DDMMYYYY)"
                      onChange={e => setDob(e.target.value)}
                      type="number"
                      id="dob"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'white', textAlign: 'center' }}>
                      Choose Avatar
                    </Typography>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      type="file"
                      accept="image/*"
                      id="avatarPreview"
                      placeholder="Avatar"
                      name="avatarPreview"
                      autoComplete="Avatar"
                      onChange={avatarChangeHandler}
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
                  Add Member
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2, pb: 5, color: 'primary.main' }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AddMemberOrganisation;
