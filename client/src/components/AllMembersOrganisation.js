import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from '@mui/material';
import './Register.css';
import { allMembers } from '../redux/actions/organisationAction';

const AllMembersOrganisation = () => {
  const dispatch = useDispatch();
  const { members } = useSelector(state => state.organisation);
  useEffect(() => {
    if (!members) {
      dispatch(allMembers());
    }
  }, [dispatch, members]);

  return (
    <div className="register__main" style={{ height: '50rem' }}>
      <div style={{ margin: 'auto', width: '80%', marginTop: '8%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Member ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">DOB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members &&
                members.map(row => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.user_id}
                    </TableCell>
                    <TableCell align="right">{row.user_name}</TableCell>
                    <TableCell align="right">{row.user_email}</TableCell>
                    <TableCell align="right">{row.user_phone}</TableCell>
                    <TableCell align="right">{row.user_dob}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AllMembersOrganisation;
