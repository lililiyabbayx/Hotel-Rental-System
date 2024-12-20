import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Container, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination || "");
  const [dates, setDates] = useState(location.state.dates || []);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5500/api/hotels?city=${destination}&min=${min || 0}&max=${max || 10000}`
  );

  const handleSearch = () => {
    console.log("Fetching data...");
    reFetch();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box>
      <Navbar />
      <Header type="list" />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
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
                name="minPrice"
                label="Min Price"
                type="number"
                fullWidth
                onChange={(e) => setMin(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                name="maxPrice"
                label="Max Price"
                type="number"
                fullWidth
                onChange={(e) => setMax(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error loading data"
            ) : !data || data.length === 0 ? (
              "No results found"
            ) : (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default List;
