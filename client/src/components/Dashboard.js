import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../redux/store';
import { getAllOrganisations } from '../redux/actions/organisationAction';

const Dashboard = () => {
  const { organisations } = useSelector(state => state.organisation);
  const [books, setBooks] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getDashboardDetails() {
      dispatch(getAllOrganisations());
      const { data } = await axios.get(`${server}/organisation/allbooks`);
      setBooks(data.totalBooks);
    }
    getDashboardDetails();
  }, [dispatch]);
  console.log(books);
  return (
    <div>
      <Box>
        {/* <Doughnut
  options={...}
  data={...}
  {...props} */}
        {/* /> */}
      </Box>
    </div>
  );
};

export default Dashboard;
