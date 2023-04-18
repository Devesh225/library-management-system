import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganisationSubscription } from '../redux/actions/paymentAction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../redux/store';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';
// import LoadingButton from '@mui/lab/LoadingButton';
// import Footer from "../Footer";

const tiers = [
  {
    title: 'Basic',
    price: '3,000',
    description: [
      'Plan for 3 months',
      'List upto 20,000 books',
      'List upto 5,000 users',
      '-',
    ],
    buttonText: 'Start Up',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Premium',
    subheader: 'Best deal ever',
    subheader2: '20% discount',
    price: '10,000',
    description: [
      'Plan for a year',
      'List upto 50,000 books',
      'List upto 10,000 users',
      'Priority email support',
    ],
    buttonText: 'Grab the deal',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Pro',
    price: '5,000',
    description: [
      'Plan for 6 months',
      'List upto 20,000 books',
      'List upto 5,000 users',
      'Priority email support',
    ],
    buttonText: 'Subscribe now',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
];

const Pricing = () => {
  const { isAuthenticated, organisation } = useSelector(
    state => state.organisation
  );
  const { loading, subscriptionID, error } = useSelector(
    state => state.payment
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [plan, setPlan] = useState('');
  const [razorKey, setRazorKey] = useState('');
  const pricingSubmitHandler = async e => {
    setPlan(e.target.id);
    const { data } = await axios.get(`${server}/organisation/razorpaykey`);
    setRazorKey(data.key);
    dispatch(createOrganisationSubscription(plan));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionID) {
      const open = () => {
        let planAmount = 0;
        if (plan === 'Basic') {
          planAmount = 3000;
        } else if (plan === 'Pro') {
          planAmount = 5000;
        } else if (plan === 'Premium') {
          planAmount = 10000;
        }
        const options = {
          key: razorKey,
          amount: planAmount, // AMOUNT IN PAISE
          currency: 'INR',
          name: 'Libraly',
          description: 'Transaction for subscription of Libraly',
          image: logo,
          subscription_id: subscriptionID,
          callback_url: `${server}/organisation/paymentverification`,
          prefill: {
            name: organisation?.organisation_name,
            email: organisation?.organisation_email,
            contact: organisation?.organisation_phone,
          },
          notes: {
            address: 'Libraly Head Office',
          },
          theme: {
            color: '##FFA500',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      open();
    }
  }, [
    dispatch,
    error,
    organisation?.organisation_name,
    organisation?.organisation_email,
    organisation?.organisation_phone,
    plan,
    razorKey,
    subscriptionID,
  ]);

  const unAuthenticatedHandler = () => {
    navigate('/organisationlogin');
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Typography
          variant="h1"
          sx={{
            color: '#FC7300',
            fontFamily: 'Montserrat',
            fontWeight: 700,
            ml: 5,
            mt: 5,
          }}
        >
          Pricing
        </Typography>
        <Box
          sx={{
            backgroundColor: '#FC7300',
            width: 500,
            ml: 5,
            mt: 0,
            height: 20,
          }}
        />
        <Box
          sx={{
            backgroundColor: '#FC7300',
            width: 400,
            ml: 5,
            mt: 2,
            height: 20,
          }}
        />

        <Container maxWidth="md" component="main" sx={{ mb: 10, mt: 15 }}>
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map(tier => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'PRO' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{
                      align: 'center',
                    }}
                    action={tier.title === 'Annual' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: theme =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        ₹{tier.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    ></Box>
                    <ul>
                      {tier.description.map(line => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      id={tier.title}
                      variant={tier.buttonVariant}
                      onClick={
                        isAuthenticated
                          ? pricingSubmitHandler
                          : unAuthenticatedHandler
                      }
                      disabled={loading}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    </>
  );
};

export default Pricing;
