import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import './Register.css';

const OrganisationProfile = () => {
  const { organisation } = useSelector(state => state.organisation);

  return (
    <div className="register__main" style={{ backgroundSize: '100%' }}>
      <Box
        sx={{
          margin: '6%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ height: 200, width: 200, marginBottom: '15px' }}
          alt="Avatar"
          src={organisation?.organisation_logo?.url}
        />
        <Box
          sx={{
            display: 'flex',
            margin: '6%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              marginBottom: '5rem',
              marginRight: '3rem',
              height: '80vh',
            }}
          >
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION ID: {organisation?.organisation_id}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION NAME: {organisation?.organisation_name}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION EMAIL: {organisation?.organisation_email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              marginBottom: '5rem',
              height: '80vh',
            }}
          >
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION PHONE: {organisation?.organisation_phone}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION ADDRESS: {organisation?.organisation_address}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION SUBSCRIPTION: &nbsp;&nbsp;
                {organisation?.organisation_subscription?.status?.toUpperCase() ||
                  'INACTIVE'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrganisationProfile;
