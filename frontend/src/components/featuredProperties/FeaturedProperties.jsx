import React from "react";
import useFetch from "../../hooks/useFetch"; // Assuming you have this custom hook for API fetching
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("http://localhost:5500/api/hotels?featured=true&limit=4");
  console.log(data)
  return (
    <>
      <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
        Highest Rated Properties
      </Typography>
      <Box
        padding={4}
        sx={{
          maxWidth: 1024,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((item) => (
              <Card
                key={item._id}
                sx={{
                  flex: "1 1 calc(25% - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.photos[0]} // Assuming photos is an array
                  alt={item.name}
                  sx={{ height: 250, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.city}
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    Starting from ${item.cheapestPrice}
                  </Typography>
                  {item.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#003580",
                          color: "white",
                          fontWeight: "bold",
                          padding: "2px 2px",
                          minWidth: 0,
                        }}
                      >
                        {item.rating}
                      </Button>
                      <Typography variant="body2" fontSize="14px">
                        Excellent
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default FeaturedProperties;
