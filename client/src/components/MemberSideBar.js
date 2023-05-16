// import { Avatar, Box, Button, Typography } from '@mui/material';
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { memberLogout } from '../redux/actions/memberAction';

// const MemberSideBar = () => {
//   const { member } = useSelector(state => state.member);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = e => {
//     e.preventDefault();
//     dispatch(memberLogout());
//     navigate('/userlogin');
//   };
//   const updateMemberDetailsHandler = e => {
//     navigate('/member/update');
//   };
//   const updatePasswordHandler = e => {
//     navigate('/member/updatepassword');
//   };
//   const searchBooksHandler = e => {
//     navigate('/book/all');
//   };
//   const viewAllIssuedBooksHandler = e => {
//     navigate('/book/issued');
//   };
//   const viewAllReturnedBooksHandler = e => {
//     navigate('/book/returned');
//   };
//   const viewAllRecommendedBooksHandler = e => {
//     navigate('/book/recommended');
//   };
//   return (
//     <div style={{ marginBottom: '1rem' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         <Box component="form" onSubmit={logoutHandler}>
//           <Avatar
//             sx={{ height: 150, width: 150 }}
//             alt="Avatar"
//             src={member?.user_avatar?.url}
//           />
//           <Typography>{member?.user_name}</Typography>
//           <Button type="submit">LOGOUT</Button>
//         </Box>
//         <Button onClick={updateMemberDetailsHandler}>UPDATE DETAILS</Button>
//         <Button onClick={updatePasswordHandler}>UPDATE PASSWORD</Button>
//         <Button onClick={searchBooksHandler}>SEARCH BOOKS</Button>
//         <Button onClick={viewAllIssuedBooksHandler}>
//           VIEW ALL ISSUED BOOKS
//         </Button>
//         <Button onClick={viewAllReturnedBooksHandler}>
//           VIEW ALL RETURNED BOOKS
//         </Button>
//         <Button onClick={viewAllRecommendedBooksHandler}>
//           VIEW ALL RECOMMENDED BOOKS
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default MemberSideBar;

// import { Avatar, Box, Button, Typography } from '@mui/material';
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { organisationLogout } from '../redux/actions/organisationAction';
// import { useNavigate } from 'react-router-dom';

// const ResponsiveSideBar = () => {
// const { organisation } = useSelector(state => state.organisation);
// const dispatch = useDispatch();
// const navigate = useNavigate();
// const logoutHandler = e => {
//   e.preventDefault();
//   dispatch(organisationLogout());
// };
//   const updateOrgDetailsHandler = e => {
//     navigate('/organisation/update');
//   };
//   const pricingSubmitHandler = e => {
//     navigate('/pricing');
//   };
//   const updateOrgPasswordHandler = e => {
//     navigate('/organisation/updatepassword');
//   };
//   const addMemberOrganisation = e => {
//     navigate('/organisation/addmember');
//   };
//   const removeMemberOrganisation = e => {
//     navigate('/organisation/removemember');
//   };
//   const allMembersOrganisation = e => {
//     navigate('/organisation/allmembers');
//   };
//   const showAllBooksOrganisation = e => {
//     navigate('/organisation/books');
//   };
//   const addNewBookOrganisation = e => {
//     navigate('/organisation/book/add');
//   };

//   const getAllOrganisationsHandler = e => {
//     navigate('/organisation/all');
//   };

//   return (
//     <div style={{ marginBottom: '1rem' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
// <Box component="form" onSubmit={logoutHandler}>
//   <Avatar
//     sx={{ height: 150, width: 150 }}
//     alt="Avatar"
//     src={organisation?.organisation_logo?.url}
//   />
//   <Typography>{organisation?.organisation_name}</Typography>
//   <Button type="submit">LOGOUT</Button>
// </Box>
//         {organisation.organisation_id === 0 ? null : organisation
//             ?.organisation_subscription?.status === 'active' ? null : (
//           <Button onClick={pricingSubmitHandler}>PRICING</Button>
//         )}
//         <Button onClick={updateOrgDetailsHandler}>
//           UPDATE ORGANISATION DETAILS
//         </Button>
//         <Button onClick={updateOrgPasswordHandler}>
//           UPDATE ORGANISATION PASSWORD
//         </Button>
//         {organisation.organisation_id === 0 ? (
//           <Box>
//             <Button onClick={getAllOrganisationsHandler}>
//               SHOW ALL ORGANISATIONS
//             </Button>
//           </Box>
//         ) : (
//           <Box>
//             <Button onClick={addMemberOrganisation}>ADD MEMBER</Button>
//             <Button onClick={removeMemberOrganisation}>REMOVE MEMBER</Button>
//             <Button onClick={allMembersOrganisation}>ALL MEMBERS LIST</Button>
//             <Button onClick={showAllBooksOrganisation}>SHOW ALL BOOKS</Button>
//             <Button onClick={addNewBookOrganisation}>ADD NEW BOOK</Button>
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default ResponsiveSideBar;

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Person2Icon from '@mui/icons-material/Person2';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';

import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';

import { Link, Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { memberLogout } from '../redux/actions/memberAction';

const drawerWidth = 320;
const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  //backgroundColor: "#F9AA33",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
const NavList = [
  {
    text: 'Member Profile',
    icon: <Person2Icon />,
    route: '/member/me',
  },
  {
    text: 'Update Member Details',
    icon: <EditIcon />,
    route: '/member/update',
  },
  {
    text: 'Update Member Password',
    icon: <PasswordIcon />,
    route: '/member/updatepassword',
  },
  {
    text: 'Search Books',
    icon: <SearchIcon />,
    route: '/book/all',
  },
  {
    text: 'View Issued Books',
    icon: <BookmarkAddedIcon />,
    route: '/book/issued',
  },
  {
    text: 'View Returned Books',
    icon: <BookmarkRemoveIcon />,
    route: '/book/returned',
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const logoutHandler = e => {
    e.preventDefault();
    dispatch(memberLogout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        style={{ background: 'rgb(252, 115, 0)' }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Member Dashboard
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              type="submit"
              onClick={logoutHandler}
              sx={{ marginLeft: '15px', color: '#fff' }}
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {NavList.map(item => (
            <Link
              to={`${item.route}`}
              key={item.text}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
              }}
            >
              <ListItem
                className="listItem"
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  autoFocus={item.text === 'Issued Books' ? true : false}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {' '}
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      textDecorationLine: 'none',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Outlet></Outlet>
    </Box>
  );
}
