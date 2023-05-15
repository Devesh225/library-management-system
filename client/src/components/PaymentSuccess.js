import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

const PaymentSuccess = () => {
  const params = useSearchParams();
  const referenceID = params[0].get('reference');
  const navigate = useNavigate();
  const dashboardHandler = () => {
    navigate('/organisation/me');
  };
  return (
    <div style={{ margin: '6%' }}>
      <h2>PAYMENT FOR LIBRALY SUCCESSFUL.</h2>
      <h3>PAYMENT REFERENCE ID: {referenceID}</h3>
      <Button onClick={dashboardHandler}>DASHBOARD</Button>
    </div>
  );
};

export default PaymentSuccess;
