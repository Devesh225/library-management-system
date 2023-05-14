import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { memberLogout } from '../redux/actions/memberAction';

const MemberSideBar = () => {
  const { member } = useSelector(state => state.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = e => {
    e.preventDefault();
    dispatch(memberLogout());
    navigate('/userlogin');
  };
  const updateMemberDetailsHandler = e => {
    navigate('/member/update');
  };
  const updatePasswordHandler = e => {
    navigate('/member/updatepassword');
  };
  const searchBooksHandler = e => {
    navigate('/book/all');
  };
  const viewAllIssuedBooksHandler = e => {
    navigate('/book/issued');
  };
  const viewAllReturnedBooksHandler = e => {
    navigate('/book/returned');
  };
  const viewAllRecommendedBooksHandler = e => {
    navigate('/book/recommended');
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
            src={member?.user_avatar?.url}
          />
          <Typography>{member?.user_name}</Typography>
          <Button type="submit">LOGOUT</Button>
        </Box>
        <Button onClick={updateMemberDetailsHandler}>UPDATE DETAILS</Button>
        <Button onClick={updatePasswordHandler}>UPDATE PASSWORD</Button>
        <Button onClick={searchBooksHandler}>SEARCH BOOKS</Button>
        <Button onClick={viewAllIssuedBooksHandler}>
          VIEW ALL ISSUED BOOKS
        </Button>
        <Button onClick={viewAllReturnedBooksHandler}>
          VIEW ALL RETURNED BOOKS
        </Button>
        <Button onClick={viewAllRecommendedBooksHandler}>
          VIEW ALL RECOMMENDED BOOKS
        </Button>
      </Box>
    </div>
  );
};

export default MemberSideBar;
