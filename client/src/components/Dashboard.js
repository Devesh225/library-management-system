import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Box} from '@mui/material'

const Dashboard = () => {
  return <div>
    <Box>
    <Doughnut
  options={...}
  data={...}
  {...props}
/>
    </Box>
  </div>;
};

export default Dashboard;
