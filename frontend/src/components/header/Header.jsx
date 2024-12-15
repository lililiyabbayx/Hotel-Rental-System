import React, { useState } from 'react';
import { Box, Button, Container, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';
export default function IconLabelTabs() {
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, child: 0, room: 1 });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  const handleOptionChange = (key, operation) => {
    setOptions((prev) => ({
      ...prev,
      [key]: operation === 'increase' ? prev[key] + 1 : Math.max(0, prev[key] - 1),
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Validate the check-out date
    if (endDate && newStartDate > endDate) {
      setDateError('Check-in date cannot be after the check-out date.');
    } else {
      setDateError('');
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    // Validate the check-in date
    if (startDate && newEndDate < startDate) {
      setDateError('Check-out date cannot be before the check-in date.');
    } else {
      setDateError('');
    }
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
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: 1,
              borderColor: 'black',
              borderRadius: 2,
              maxWidth: '1100px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField fullWidth label="Where are you going?" placeholder="Chittagong" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Check-in"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startDate}
                  onChange={handleStartDateChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Check-out"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endDate}
                  onChange={handleEndDateChange}
                  variant="outlined"
                />
              </Grid>
              {dateError && (
                <Grid item xs={12}>
                  <Typography color="error">{dateError}</Typography>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
              <Button
                  onClick={handleOptionsClick}
                  disabled={false}
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
                  sx={{ p: 4 ,mt:0}}
                >
                  {['adult', 'child', 'room'].map((key) => (
                    <MenuItem key={key}>
                      <Typography sx={{ flex: 1 }}>{key.toUpperCase()}</Typography>
                      <IconButton
                        onClick={() => handleOptionChange(key, 'decrease')}
                        disabled={options[key] === 1 && (key === 'adult' || key === 'room')}
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
              <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="Black" sx={{ height: '50px', mt: 1, px: 4 }}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}
