import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const properties = [
  {
    img: "https://media.istockphoto.com/id/1180148363/photo/evening-view-of-the-grand-sultan-tea-resort-golf.jpg?s=170667a&w=0&k=20&c=r8edfG1EdEZSMrJNnxecbTsBKPhhVUbOnjmWkyW9hNA=",
    name: "Sylhet Grand Hotel",
    city: "Sylhet",
    price: "Starting from $120",
    rating: 8.9,
    ratingText: "Excellent",
  },
  {
    img: "https://a.storyblok.com/f/287000/2000x1335/6ddf1576ea/galerie-suite-baie-vitree-vu-sur-la-montagne.jpg/m/filters:format(webp):quality(80)",
    name: "Chittagong Comfort Inn",
    city: "Chittagong",
    price: "Starting from $140",
    rating: 9.3,
    ratingText: "Exceptional",
  },
  {
    img: "https://olavthon.imagevault.media/publishedmedia/osdwvxwzljp838cn171l/Thon_Hotel_Brussels_Airport-5.webp",
    name: "Rajshahi Four Seasons",
    city: "Rajshahi",
    price: "Starting from $99",
    rating: 8.8,
    ratingText: "Excellent",
  },
  {
    img: "https://pix10.agoda.net/hotelImages/119/1196495/1196495_17122303270060592537.jpg?ca=6&ce=1&s=312x235&ar=16x9",
    name: "Rangamati Lake Resort",
    city: "Rangamati",
    price: "Starting from $110",
    rating: 9.1,
    ratingText: "Superb",
  },
];

const FeaturedProperties = () => {
  return (
    <Box padding={4}
      sx={{
        maxWidth: 1024,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {properties.map((property, index) => (
        <Card
          key={index}
          sx={{
            flex: "1 1 calc(25% - 16px)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <CardMedia
            component="img"
            image={property.img}
            alt={property.name}
            sx={{ height: 250, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {property.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.city}
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {property.price}
            </Typography>
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
                {property.rating}
              </Button>
              <Typography variant="body2" fontSize="14px">
                {property.ratingText}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FeaturedProperties;
```
