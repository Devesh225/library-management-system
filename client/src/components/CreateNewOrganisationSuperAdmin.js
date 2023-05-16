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
import { useEffect, useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import AboutAvatar from './AboutAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganisationSuperAdmin } from '../redux/actions/organisationAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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

const CreateNewOrganisationSuperAdmin = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [avatar, setAvatar] = useState();

  const { message } = useSelector(state => state.organisation);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  });

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
  const addOrganisationFormSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('address', address);
    myForm.append('email', email);
    myForm.append('phone', phone);
    myForm.append('password', password);
    myForm.append('file', avatar);
    dispatch(createOrganisationSuperAdmin(myForm));
    navigate('/organisation/all');
    window.location.reload();
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
                Create Organisation
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={addOrganisationFormSubmitHandler}
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="name"
                      placeholder="Organisation Address"
                      name="name"
                      onChange={e => setAddress(e.target.value)}
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
                  Create Organisation
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

export default CreateNewOrganisationSuperAdmin;
