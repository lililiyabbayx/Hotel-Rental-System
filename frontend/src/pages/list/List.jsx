import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Container, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchitem/SearchItem";

const List = () => {
  //useLocation hook to access location state passed via the router (navigation)
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || '');// // Default state from location or empty string
  const [checkInDate, setCheckInDate] = useState(location.state?.date?.[0]?.startDate || ''); // Default check-in date
  const [checkOutDate, setCheckOutDate] = useState(location.state?.date?.[0]?.endDate || '');// Default check-out date
  // Function to handle changes in the check-in and check-out dates
  const handleDateChange = (e) => {
    const { name, value } = e.target;//get the name and value from the target ,
    if (name === "checkInDate") {
      setCheckInDate(value);
    } else if (name === "checkOutDate") {
      setCheckOutDate(value);
    }
  };

  const handleFilter = () => {
    // Implement filter logic here
    console.log("Filtering with:", { destination, checkInDate, checkOutDate });
  };

  return (
    <Box>
      <Navbar />
      <Header type="list" />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="destination"
                  label="Destination"
                  variant="outlined"
                  fullWidth
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="checkInDate"
                  label="Check-in Date"
                  type="date"
                  fullWidth
                  value={checkInDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="checkOutDate"
                  label="Check-out Date"
                  type="date"
                  fullWidth
                  value={checkOutDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleFilter}
                >
                  Apply Filter
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default List;