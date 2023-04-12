import { Button } from '@mui/material';
import './Home.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home__main">
      <div>
        <div className="bg-img">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/07/03/22/books-2599241_960_720.jpg"
            alt="im"
            height={'100%'}
            width={'100%'}
          />
        </div>

        <div className="front-line">
          <h1>Libraly</h1>
        </div>
        <div className="sub-line">
          <h2>A HUB FOR BOOKS AND KNOWLEDGE</h2>
        </div>
        <Button
          variant="contained"
          sx={{ ml: 21, mt: 55, p: 2 }}
          style={{ background: '#FC7300' }}
        >
          <NavLink
            to="/organisationregister"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Get Started
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Home;
