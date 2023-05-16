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
import { updateOrganisationDetails } from '../redux/actions/organisationAction';
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

const UpdateOrgDetails = () => {
  const {
    organisation_id,
    organisation_name,
    organisation_email,
    organisation_address,
    organisation_phone,
    organisation_logo,
  } = useSelector(state => state.organisation.organisation);

  const [name, setName] = useState(organisation_name);
  const [email, setEmail] = useState(organisation_email);
  const [address, setAddress] = useState(organisation_address);
  const [phone, setPhone] = useState(organisation_phone);
  const [avatarPreview, setAvatarPreview] = useState(organisation_logo?.url);
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

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

  const updateFormSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('address', address);
    myForm.append('phone', phone);
    myForm.append('file', avatar);
    dispatch(updateOrganisationDetails(myForm));
    navigate('/organisation/me');
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
                {organisation_id === 0
                  ? 'Update Super Admin Details'
                  : 'Update Organisation Details'}
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={updateFormSubmitHandler}
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
                      value={name}
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
                      value={email}
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
                      value={address}
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
                      value={phone}
                      type="number"
                      id="phone"
                      autoComplete="Phone"
                      onChange={e => setPhone(e.target.value)}
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
                  Update
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

export default UpdateOrgDetails;
