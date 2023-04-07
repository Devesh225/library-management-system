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
import ResponsiveAppBar from './ResponsiveAppBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { organisationLogin } from '../redux/actions/organisationAction';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://libraly.com/">
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

const LoginOrg = () => {
  const [orgId, setOrgId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginSubmitHandler = e => {
    e.preventDefault();
    dispatch(organisationLogin(orgId, password));
  };

  return (
    <div className="register__main">
      <ResponsiveAppBar />
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
                Admin Login Here
              </Typography>
              <Box
                component="form"
                onSubmit={loginSubmitHandler}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="orgId"
                      placeholder="Organisation ID"
                      name="orgId"
                      onChange={e => setOrgId(e.target.value)}
                      autoComplete="family-name"
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
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      id="password"
                      autoComplete="new-password"
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
                  Sign in
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ mb: 'none' }}>
                    <Link href="/login" variant="body2">
                      Not registered yet? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2, color: 'primary.main' }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default LoginOrg;