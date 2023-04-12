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
import { organisationRegister } from '../redux/actions/organisationAction';

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

const RegisterOrg = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();

  const avatarChangeHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  //   const submitOrganisationDetailsHandler = e => {
  //     e.preventDefault();
  //     window.location.href = '/pricing';
  //   };

  const registerFormSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('address', address);
    myForm.append('phone', phone);
    myForm.append('password', password);
    myForm.append('file', avatar);
    dispatch(organisationRegister(myForm));
  };

  return (
    <div className="register__main">
      <div className="signup-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
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
                Register Organisation
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                // onSubmit={registerFormSubmitHandler}
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
                      placeholder="Organisation Name"
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
                      id="address"
                      placeholder="Address"
                      name="address"
                      autoComplete="Address"
                      onChange={e => setAddress(e.target.value)}
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
                      name="password"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      autoComplete="new-password"
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
                  onClick={registerFormSubmitHandler}
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
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ mb: 'none' }}>
                    <Link href="/organisationlogin" variant="body2">
                      Already Registered? Login.
                    </Link>
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Grid item sx={{ mb: 'none' }}>
                    <Link href="/userregister" variant="body2">
                      Not An Organisation? User Registration.
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2, pb: 5, color: 'primary.main' }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default RegisterOrg;
