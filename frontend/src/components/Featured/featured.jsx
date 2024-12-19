import React from 'react';
import { Box, Typography } from '@mui/material';

const featuredData = [
  {
    image:
      'https://wiki.openstreetmap.org/w/images/4/48/Cox_103.webp',
    title: 'Cox Bazar',
    properties: '180 properties',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGbCqYshtd1CSB9YTY7OuhUbNXWOdAAQMHQ&s',
    title: 'Ranga Mati',
    properties: '50 properties',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmUsN6NAOpgZBT_Vjz4ydIrR_OQHT0c1t3-g&s',
    title: 'Sylhet',
    properties: '140 properties',
  },
];

const Featured = () => {
  return (
    <Box padding={2}

      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        width: '100%',
        maxWidth: '1024px',
        margin: '0 auto',
        zIndex: 1,
      }}
    >
      {featuredData.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            color: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            height: '250px',
            flex: 1,
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
            }}
          >
            <Typography variant="h5" component="h1">
              {item.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {item.properties}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Featured;
