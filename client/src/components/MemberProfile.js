import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import './Register.css';

const MemberProfile = () => {
  const { member } = useSelector(state => state.member);

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
          src={member?.user_avatar?.url}
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
                ORGANISATION ID: {member?.organisation_id}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                ORGANISATION NAME: {member?.organisation_name}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                MEMBER ID: {member?.user_id}
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
                MEMBER NAME: {member?.user_name}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                MEMBER EMAIL: {member?.user_email}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>
                MEMBER PHONE: {member?.user_phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MemberProfile;
