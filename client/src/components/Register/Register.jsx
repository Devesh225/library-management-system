import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Register.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://libraly.com/">
        Libraly
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 15,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#fb8500",
    },
  },
});

const Register = () => {
  return (
    <div className="register__body">
      <div className="signup-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                className="signup-heading"
                sx={{ mt: 5, mb: 2, color: "primary.main" }}
              >
                Register Organisation
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <TextField
                      className="signup-input"
                      required
                      fullWidth
                      size="small"
                      id="name"
                      placeholder="Organisation Name"
                      name="name"
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
                    bgColor: "primary.main",
                    borderRadius: "15px",
                    color: "common.white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ mb: "none" }}>
                    <Link href="/login" variant="body2">
                      Organisation is already registered? Sign in.
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2, color: "primary.main" }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;