import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import './Register.css';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const Contact = () => {
  return (
    <div className="register__main" style={{ backgroundSize: '100%' }}>
      <div>
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
          Contact Us!
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

        <Card
          style={{
            maxWidth: 450,
            margin: '0 auto',
            background: '#F99B7D',
            marginTop: 100,
            border: '5px solid #850000',
            borderRadius: 5,
            padding: '1rem',
          }}
        >
          <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} Item>
                  <TextField
                    label="First name"
                    placeholder="Enter first name"
                    variant="outlined"
                    fullwidth
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      marginBottom: 20,
                      marginRight: 5,
                      width: 430,
                    }}
                  />
                </Grid>
                <Grid xs={12} Item>
                  <TextField
                    label="Last name"
                    placeholder="Enter last name"
                    variant="outlined"
                    fullwidth
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      marginBottom: 20,
                      width: 430,
                    }}
                  />
                </Grid>
                <Grid sm={12} md={12} Item>
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                    variant="outlined"
                    fullwidth
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      marginBottom: 20,
                      width: 430,
                    }}
                  />
                </Grid>

                <Grid xs={12} Item>
                  <TextField
                    type="number"
                    label="Phone number"
                    placeholder="Enter phone number"
                    variant="outlined"
                    fullwidth
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      marginBottom: 20,
                      width: 430,
                    }}
                  />
                </Grid>
                <Grid xs={12} Item>
                  <TextField
                    label="Message"
                    multiline
                    rows={6}
                    placeholder="Type your message"
                    variant="outlined"
                    fullwidth
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      marginBottom: 20,
                      width: 430,
                    }}
                  />
                </Grid>
                <Grid xs={12} Item>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: '#850000' }}
                    >
                      SUBMIT
                    </Button>

                    <Grid Item>
                      <EmailIcon sx={{ color: '#850000' }} />
                    </Grid>
                    <Grid Item>
                      <InstagramIcon sx={{ color: '#850000' }} />
                    </Grid>
                    <Grid Item>
                      <TwitterIcon sx={{ color: '#850000' }} />
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 700,
            textAlign: 'center',
            marginTop: 15,
          }}
        >
          By Phone
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          (Monday to Friday, 9am to 4pm IST) +91 6291489670
        </Typography>
      </div>
    </div>
  );
};

export default Contact;
