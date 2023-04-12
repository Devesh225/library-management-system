import * as React from 'react';
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
// import Footer from "../Footer";

const tiers = [
  {
    title: 'STARTER',
    price: '1,500',
    ppm: '500',
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
    title: 'PRO',
    subheader: 'Best deal ever',
    subheader2: '20% discount',
    price: '4,800',
    ppm: '400',
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
    title: 'PLUS',
    price: '3,000',
    ppm: '500',
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

function PricingContent() {
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
                    >
                      <Typography variant="h6" color="text.secondary">
                        ₹{tier.ppm}/mo
                      </Typography>
                    </Box>
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
                    <Button fullWidth variant={tier.buttonVariant}>
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
}

export default function Pricing() {
  return <PricingContent />;
}
