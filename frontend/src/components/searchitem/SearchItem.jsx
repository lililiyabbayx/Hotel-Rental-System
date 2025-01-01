import React from "react";
import { Box, Typography, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid lightgray",
        borderRadius: 1,
        p: 2,
        mb: 2,
        gap: 2,
      }}
    >
      {/* Image Section */}
      <img
        src={item.photos.length > 0 ? item.photos[0] : "default-image.jpg"} // Fallback image
        alt={item.name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />

      {/* Description Section */}
      <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.distance}m from center
        </Typography>
        {item.freeTaxi && (
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#008009",
              color: "white",
              display: "inline-block",
              p: "2px 6px",
              borderRadius: "4px",
            }}
          >
            Free airport taxi
          </Typography>
        )}
        <Typography variant="body2" fontStyle="italic">
          Studio Apartment with Air conditioning
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.desc}
        </Typography>
        <Typography variant="body2" color="success.main" fontWeight="bold">
          Free cancellation
        </Typography>
        <Typography variant="body2" color="textSecondary">
          You can cancel later, so lock in this great price today!
        </Typography>
      </Box>

      {/* Details Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Rating */}
        {item.rating && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Excellent
            </Typography>
            <Rating value={item.rating} readOnly precision={0.1} />
          </Box>
        )}

        {/* Price and Action */}
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: "bold" }}>
            ${item.cheapestPrice}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Includes taxes and fees
          </Typography>
          <Link to={`/hotels/${item._id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                mt: 1,
                backgroundColor: "#0071c2",
                color: "white",
                fontWeight: "bold",
                borderRadius: 1,
                p: "8px 16px",
                "&:hover": { backgroundColor: "#005bb5" },
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
