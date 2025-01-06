import React from "react";
import { Box, Button, Typography, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        p: 2,
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
    
      <img
        src={item.photos.length > 0 ? item.photos[0] : "default-image.jpg"} // Fallback image if no photos
        alt={item.name}
        style={{ width: 200, height: 200, objectFit: "cover" }}
      />

  
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 2 }}>
        <Typography variant="h6" color="primary">
          {item.name}
        </Typography>
        <Typography variant="body2">{item.distance}m from center</Typography>
        {item.freeTaxi && (
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#008009",
              color: "white",
              display: "inline",
              p: 0.5,
              borderRadius: 1,
            }}
          >
            Free airport taxi
          </Typography>
        )}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Free transporation to and from the airport

        </Typography>
        <Typography variant="body2">{item.desc}</Typography>
        <Typography variant="body2" sx={{ color: "#008009", fontWeight: "bold" }}>
          Free Buffet Breakfast
        </Typography>
        <Typography variant="body2" sx={{ color: "#008009" }}>
          10% discount on all food and drinks for Reservations made through the website!

        </Typography>
      </Box>

    
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Rating */}
        {item.rating && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Excellent
            </Typography>
            <Rating value={item.rating} readOnly precision={0.1} />
          </Box>
        )}
    
        <Box sx={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: "24px" }}>
            {item.cheapestPrice}/-TK
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Includes taxes and fees
          </Typography>
          <Link to={`/hotels/${item._id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0071c2",
                color: "white",
                fontWeight: "bold",
                borderRadius: 1,
                padding: "10px 5px",
              }}
            >
              See availability
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchItem;
