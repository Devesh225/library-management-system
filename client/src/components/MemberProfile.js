import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const MemberProfile = () => {
  const { member } = useSelector(state => state.member);

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
          src={member?.user_avatar?.url}
        />
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION ID: {member?.organisation_id}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          ORGANISATION NAME: {member?.organisation_name}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          MEMBER ID: {member?.user_id}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          MEMBER NAME: {member?.user_name}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          MEMBER EMAIL: {member?.user_email}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          MEMBER PHONE: {member?.user_phone}
        </Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          MEMBER DOB : {member?.user_dob}
        </Typography>
      </Box>
    </div>
  );
};

export default MemberProfile;
