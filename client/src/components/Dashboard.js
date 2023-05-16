import React, { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllBooksSuperAdmin,
  getAllMembersSuperAdmin,
  getAllOrganisations,
} from '../redux/actions/organisationAction';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const Dashboard = () => {
  const { organisations, totalBooks, totalMembers, outOfStockBooks } =
    useSelector(state => state.organisation);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getTotalOrganisations() {
      dispatch(getAllOrganisations());
    }
    async function getTotalBooks() {
      dispatch(getAllBooksSuperAdmin());
    }
    async function getTotalMembers() {
      dispatch(getAllMembersSuperAdmin());
    }
    getTotalBooks();
    getTotalOrganisations();
    getTotalMembers();
  }, [dispatch]);

  const lineStateMember = {
    labels: ['Initial Members', 'Members Currently'],
    datasets: [
      {
        label: 'TOTAL MEMBERS',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalMembers],
      },
    ],
  };

  const lineStateOrganisation = {
    labels: ['Initial Organisations', 'Organisations Currently'],
    datasets: [
      {
        label: 'TOTAL ORGANISATIONS',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, organisations?.length],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock Books', 'Available Books'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStockBooks, totalBooks - outOfStockBooks],
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div
      className="register__main"
      style={{ height: '125rem', backgroundSize: '100%' }}
    >
      <div style={{ margin: '8%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '5rem',
          }}
        >
          <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
            <Typography sx={{ fontSize: '1.25rem' }}>
              Total Organisations Registered: {organisations?.length}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
            <Typography sx={{ fontSize: '1.25rem' }}>
              Total Members Added: {totalMembers}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: 'orange', padding: '3rem' }}>
            <Typography sx={{ fontSize: '1.25rem' }}>
              Total Books Added: {totalBooks}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '60%',
              backgroundColor: 'orange',
              padding: '2rem',
            }}
          >
            <Line data={lineStateOrganisation} />
          </div>
          <div
            style={{
              width: '60%',
              backgroundColor: 'orange',
              padding: '2rem',
            }}
          >
            <Line data={lineStateMember} />
          </div>
          <div
            style={{
              width: '60%',
              backgroundColor: 'orange',
              padding: '2rem',
            }}
          >
            <Doughnut data={doughnutState} />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
