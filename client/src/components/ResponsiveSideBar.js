import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organisationLogout } from '../redux/actions/organisationAction';
import { useNavigate } from 'react-router-dom';

const ResponsiveSideBar = () => {
  const { organisation } = useSelector(state => state.organisation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = e => {
    e.preventDefault();
    dispatch(organisationLogout());
  };
  const updateOrgDetailsHandler = e => {
    console.log('BUTTON CLICKED');
    navigate('/organisation/update');
  };
  const pricingSubmitHandler = e => {
    navigate('/pricing');
  };
  const updateOrgPasswordHandler = e => {
    navigate('/organisation/updatepassword');
  };
  const addMemberOrganisation = e => {
    navigate('/organisation/addmember');
  };
  const removeMemberOrganisation = e => {
    navigate('/organisation/removemember');
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box component="form" onSubmit={logoutHandler}>
          <Avatar
            sx={{ height: 150, width: 150 }}
            alt="Avatar"
            src={organisation?.organisation_logo?.url}
          />
          <Typography>{organisation?.organisation_name}</Typography>
          <Button type="submit">LOGOUT</Button>
        </Box>
        {organisation?.organisation_subscription?.status === 'active' ? null : (
          <Button onClick={pricingSubmitHandler}>PRICING</Button>
        )}
        <Button onClick={updateOrgDetailsHandler}>
          UPDATE ORGANISATION DETAILS
        </Button>
        <Button onClick={updateOrgPasswordHandler}>
          UPDATE ORGANISATION PASSWORD
        </Button>
        <Button onClick={addMemberOrganisation}>ADD MEMBER</Button>
        <Button onClick={removeMemberOrganisation}>REMOVE MEMBER</Button>
      </Box>
    </div>
  );
};

export default ResponsiveSideBar;
