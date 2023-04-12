import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import BookIcon from "@mui/icons-material/Book";
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" style={{ background: '#FC7300' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} width="4%" alt="LOGO" />
          &nbsp;
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Century Gothic',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Libraly
          </Typography>
          &nbsp;&nbsp;
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <NavLink
              to="/"
              style={{
                color: '#fff',
                textDecoration: 'none',
                paddingRight: '1%',
                paddingLeft: '1%',
                fontFamily: 'Montserrat',
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={{
                color: '#fff',
                textDecoration: 'none',
                paddingRight: '1%',
                paddingLeft: '1%',
                fontFamily: 'Montserrat',
              }}
            >
              About
            </NavLink>
            <NavLink
              to="/pricing"
              style={{
                color: '#fff',
                textDecoration: 'none',
                paddingRight: '1%',
                paddingLeft: '1%',
                fontFamily: 'Montserrat',
              }}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/organisationregister"
              style={{
                color: '#fff',
                textDecoration: 'none',
                paddingRight: '1%',
                paddingLeft: '1%',
                fontFamily: 'Montserrat',
              }}
            >
              Register
            </NavLink>
            <NavLink
              to="/organisationlogin"
              style={{
                color: '#fff',
                textDecoration: 'none',
                paddingRight: '2%',
                fontFamily: 'Montserrat',
                marginLeft: 'auto',
              }}
            >
              Login
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
