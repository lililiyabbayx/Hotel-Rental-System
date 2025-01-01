// List.js
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Container, Grid, Typography, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { SearchContext } from "../../context/SearchContext"; // Import SearchContext

const List = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dates, options, dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState(location.state?.destination || "");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openOptions, setOpenOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data, loading, reFetch } = useFetch(
    `http://localhost:5500/api/hotels?city=${destination}&min=${min || 0}&max=${max || 10000}`
  );

  const handleSearch = () => {
    reFetch();
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        city: destination,
        dates: dates,
        options: options,
      },
    });
  };

  const handleOptionChange = (key, operation) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        options: {
          ...options,
          [key]: operation === "increase" ? options[key] + 1 : Math.max(key === "adult" ? 1 : 0, options[key] - 1),
        },
      },
    });
  };

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  const handleViewHotel = (hotel) => {
    navigate("/hotel", {
      state: {
        dates,
        options,
        destination,
        hotel,
      },
    });
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
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  name="startDate"
                  label="Check-in"
                  type="date"
                  value={dates?.startDate || ""}
                  onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { dates: { ...dates, startDate: e.target.value } } })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="endDate"
                  label="Check-out"
                  type="date"
                  value={dates?.endDate || ""}
                  onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { dates: { ...dates, endDate: e.target.value } } })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button onClick={handleOptionsClick} sx={{ height: "50px", width: "100%" }} variant="outlined">
                  {`${options.adult} Adults, ${options.child} Children, ${options.room} Room(s)`}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openOptions}
                  onClose={handleOptionsClose}
                  sx={{ p: 4, mt: 0 }}
                >
                  {Object.keys(options).map((key) => (
                    <MenuItem key={key}>
                      <Typography sx={{ flex: 1 }}>{key.toUpperCase()}</Typography>
                      <IconButton
                        onClick={() => handleOptionChange(key, "decrease")}
                        disabled={options[key] === (key === "adult" ? 1 : 0)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography sx={{ width: "30px", textAlign: "center" }}>{options[key]}</Typography>
                      <IconButton onClick={() => handleOptionChange(key, "increase")}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
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
                sx={{ height: "50px" }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">
                <strong>Dates:</strong> {dates?.startDate && dates?.endDate ? `${dates.startDate} to ${dates.endDate}` : "Not selected"} | 
                <strong> Guests:</strong> {options.adult} Adults, {options.child} Children | 
                <strong> Rooms:</strong> {options.room} Room(s)
              </Typography>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : (
              data?.map((item) => (
                <SearchItem key={item._id} item={item} handleViewHotel={() => handleViewHotel(item)} />
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default List;
