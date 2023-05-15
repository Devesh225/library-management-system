import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
} from '@mui/material';
import {
  deleteOrganisationSuperAdmin,
  getAllOrganisations,
} from '../redux/actions/organisationAction';
import { useNavigate } from 'react-router-dom';

const ShowAllOrganisations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organisations } = useSelector(state => state.organisation);
  useEffect(() => {
    dispatch(getAllOrganisations());
  }, [dispatch]);

  const editOrganisationHandler = e => {
    navigate(`/updateorganisation/${e.currentTarget.id}`);
  };

  const deleteOrganisationHandler = e => {
    dispatch(deleteOrganisationSuperAdmin(e.currentTarget.id));
    navigate('/organisation/all');
    window.location.reload();
  };

  return (
    <div style={{ margin: 'auto', width: '80%', marginTop: '8%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Member ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Subscription</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organisations &&
              organisations.map(row => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.organisation_id}
                  </TableCell>
                  <TableCell align="right">{row.organisation_name}</TableCell>
                  <TableCell align="right">{row.organisation_email}</TableCell>
                  <TableCell align="right">{row.organisation_phone}</TableCell>
                  <TableCell align="right">
                    {row.organisation_subscription?.status
                      ? 'ACTIVE'
                      : 'INACTIVE'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={editOrganisationHandler}
                      id={row._id}
                    >
                      <EditIcon />
                    </IconButton>
                    &nbsp;&nbsp;
                    <IconButton
                      aria-label="delete"
                      onClick={deleteOrganisationHandler}
                      id={row._id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShowAllOrganisations;
