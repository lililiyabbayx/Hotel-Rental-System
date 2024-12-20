import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';

const Header = ({ type }) => {
  //state manage hooks
  const navigate = useNavigate();//for navigate to other page
  const [value, setValue] = useState(0);// for tab select
  const [destination, setDestination] = useState('');//for destination input
  const [startDate, setStartDate] = useState('');//for start date input
  const [endDate, setEndDate] = useState('');//for end date input
  const [dateError, setDateError] = useState('');//for date error
  const [openOptions, setOpenOptions] = useState(false);//
  const [options, setOptions] = useState({ adult: 1, child: 0, room: 1 });//for options adults,child,room
  const [anchorEl, setAnchorEl] = useState(null);//for menu select

   // Open the options menu when clicked
   const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };
  // Close the options menu when clicked
  const handleOptionsClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };
  // Increase or decrease the options
  const handleOptionChange = (key, operation) => {
    setOptions((prev) => ({
      ...prev,
      [key]: operation === 'increase'
        ? (key === 'adult' ? prev[key] + 1 : prev[key] + 1)
        : Math.max(key === 'adult' ? 1 : 0, prev[key] - 1),
    }));
  };
  // Handle the tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Handle the start date change
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate > endDate) {
      setDateError('Check-in date cannot be after the check-out date.');
    } else {
      setDateError('');
    }
  };
  //handle the end date change
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate < startDate) {
      setDateError('Check-out date cannot be before the check-in date.');
      setEndDate('');
    } else {
      setDateError('');
    }
  };
  //handle the search  button click
  const handleSearch = () => {
    if (dateError) {
      return;
    }
    // Navigate to the hotels page with the search parameters
    navigate('/hotels', {
      state: {
        destination,
        date: [{
          startDate,
          endDate
        }],
        options
      }
    });
  };

  return (
    <Box sx={{ maxHeight: '100vh' }}>
      <Stack direction="row" spacing={10}>
        <Container maxWidth="50" sx={{ mt: 4, mb: 4 }}>
          <Box textAlign="center" py={5} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="h3" gutterBottom>
              Your Gateway to Dream Destinations
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Effortless hotel bookings and travel packages that let you focus on the joy of exploration
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
              <Tab href="/" icon={<LocalHotelIcon />} label="HOTELS" />
              <Tab href="/tours" icon={<DownhillSkiingIcon />} label="TOURS" />
            </Tabs>
          </Box>
          <Box padding={2}>
            {type !== 'list' && (
              <Box sx={{
                mt: 4,
                p: 3,
                border: 1,
                borderColor: 'black',
                borderRadius: 2,
                maxWidth: '1100px',
                width: '100%',
                margin: '0 auto',
              }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign="center">
                  <Grid xs={12} sm={6} md={4}>
                    <TextField 
                      fullWidth 
                      label="Where are you going?" 
                      placeholder="Chittagong" 
                      variant="outlined"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Check-in"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={startDate}
                      onChange={handleStartDateChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Check-out"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={endDate}
                      onChange={handleEndDateChange}
                      variant="outlined"
                    />
                  </Grid>
                  {dateError && (
                    <Grid xs={12}>
                      <Typography color="error">{dateError}</Typography>
                    </Grid>
                  )}
                  <Grid xs={12} sm={6} md={4}>
                    <Button
                      onClick={handleOptionsClick}
                      sx={{ height: '50px', mt: 1, px: 4 }}
                      variant="outlined"
                      color="Black"
                    >
                      {`${options.adult} adults, ${options.child} children, ${options.room} room`}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openOptions}
                      onClose={handleOptionsClose}
                      sx={{ p: 4, mt: 0 }}
                    >
                      {['adult', 'child', 'room'].map((key) => (
                        <MenuItem key={key}>
                          <Typography sx={{ flex: 1 }}>{key.toUpperCase()}</Typography>
                          <IconButton
                            onClick={() => handleOptionChange(key, 'decrease')}
                            disabled={options[key] === (key === 'adult' ? 1 : 0)}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <Typography sx={{ width: '30px', textAlign: 'center' }}>
                            {options[key]}
                          </Typography>
                          <IconButton onClick={() => handleOptionChange(key, 'increase')}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  <Grid xs={12} textAlign="center">
                    <Button 
                      variant="contained" 
                      color="Black" 
                      sx={{ height: '50px', mt: 1, px: 4 }}
                      onClick={handleSearch}
                      disabled={!destination || !startDate || !endDate || dateError}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </Stack>
    </Box>
  );
};

export default Header;