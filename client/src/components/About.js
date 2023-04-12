import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import medhaAvatar from '../assets/medha.jpg';
import deveshAvatar from '../assets/devesh.jpg';
import binayakAvatar from '../assets/binayak.jpeg';
import nabarunAvatar from '../assets/binayak.jpeg';
import abhinavAvatar from '../assets/abhinav.jpeg';
import AboutAvatar from './AboutAvatar';

function About() {
  return (
    <>
      <div>
        <div className="Ab">
          <Typography
            variant="h1"
            sx={{
              color: '#FC7300',
              fontFamily: 'Montserrat',
              fontWeight: 700,
              ml: 5,
              mt: 5,
            }}
          >
            About Us
          </Typography>
          <Box
            sx={{
              backgroundColor: '#FC7300',
              width: 500,
              ml: 5,
              mt: 0,
              height: 20,
            }}
          />
          <Box
            sx={{
              backgroundColor: '#FC7300',
              width: 400,
              ml: 5,
              mt: 2,
              height: 20,
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: '10%',
              marginBottom: '0%',
            }}
          >
            <AboutAvatar avatar={medhaAvatar} name={'Medha Chakraborty'} />
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#FC7300',
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                OUR MISSION
              </Typography>

              <Box sx={{ width: 500 }}>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    textAlign: 'left',
                  }}
                >
                  Libraly is a software management system that helps in
                  maintaining records of all library objects and activities. It
                  is a library management system which is additionally referred
                  to as automatic library system that keeps track of each book
                  issued, returned and added to library. Various sorts of
                  modules are utilized in library management system for sleek
                  functioning of the system.
                </Typography>
              </Box>
            </div>
            <AboutAvatar avatar={deveshAvatar} name={'Devesh Tulshyan'} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '3%',
              marginBottom: '3%',
            }}
          >
            <AboutAvatar avatar={binayakAvatar} name={'Binayak Sarkar'} />
            <AboutAvatar avatar={nabarunAvatar} name={'Nabarun Middya'} />
            <AboutAvatar avatar={abhinavAvatar} name={'Abhinav Bhowmik'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
