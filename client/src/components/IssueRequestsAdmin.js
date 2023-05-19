import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
} from '@mui/material';

import {
  getAllIssueRequestsAdmin,
  issueBookConfirmation,
  rejectRequestAdmin,
} from '../redux/actions/organisationAction';

const IssueRequestsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requests, message } = useSelector(state => state.organisation);

  useEffect(() => {
    dispatch(getAllIssueRequestsAdmin());
  }, [dispatch, message]);

  const approveRequestHandler = e => {
    dispatch(issueBookConfirmation(e.currentTarget.id));
    navigate(`/organisation/issuerequests`);
  };

  const rejectRequestHandler = e => {
    dispatch(rejectRequestAdmin(e.currentTarget.id));
    navigate(`/organisation/issuerequests`);
  };

  return (
    <div
      className="register__main"
      style={{ height: '50rem', backgroundSize: '100%' }}
    >
      <div style={{ margin: 'auto', width: '80%', marginTop: '8%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Member ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Book ISBN</TableCell>
                <TableCell align="right">Book Name</TableCell>
                <TableCell align="right">Available Copies</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests &&
                requests.map(request => (
                  <TableRow
                    key={request._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {request.member_id}
                    </TableCell>
                    <TableCell align="right">{request.member_name}</TableCell>
                    <TableCell align="right">{request.book_isbn}</TableCell>
                    <TableCell align="right">{request.book_name}</TableCell>
                    <TableCell align="right">
                      {request.book_available_copies}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        aria-label="approve"
                        onClick={approveRequestHandler}
                        id={request._id}
                        variant="contained"
                      >
                        APPROVE
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        aria-label="reject"
                        onClick={rejectRequestHandler}
                        id={request._id}
                        variant="contained"
                      >
                        REJECT
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default IssueRequestsAdmin;
