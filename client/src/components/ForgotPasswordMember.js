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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordMember } from '../redux/actions/memberAction';

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

const ForgotPasswordMember = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatePasswordFormSubmitHandler = e => {
    e.preventDefault();
    dispatch(forgotPasswordMember(email));
    navigate('/userlogin');
  };

  return (
    <div className="register__main" style={{ height: '50rem' }}>
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
                Forgot Password
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={updatePasswordFormSubmitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
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
                  Send Reset Password Link
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

export default ForgotPasswordMember;
