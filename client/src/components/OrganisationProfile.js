import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const OrganisationProfile = () => {
  const { organisation } = useSelector(state => state.organisation);

  return (
    <div>
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
          sx={{ height: 150, width: 150, marginBottom: '15px' }}
          alt="Avatar"
          src={organisation?.organisation_logo?.url}
        />
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION ID: {organisation?.organisation_id}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION NAME: {organisation?.organisation_name}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION EMAIL: {organisation?.organisation_email}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION PHONE: {organisation?.organisation_phone}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION ADDRESS: {organisation?.organisation_address}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION SUBSCRIPTION: &nbsp;&nbsp;
          {organisation?.organisation_subscription?.status?.toUpperCase() ||
            'INACTIVE'}
        </Typography>
      </Box>
    </div>
  );
};

export default OrganisationProfile;
