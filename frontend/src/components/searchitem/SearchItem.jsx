import React from 'react';
import { Box, Button, Typography, Rating } from '@mui/material';

const SearchItem = () => {
  return (
    <Box
      sx={{
        border: '1px solid lightgray',
        p: 2,
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mb: 2,
      }}
    >
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt="Cox's Bazar Resort"
        style={{ width: 200, height: 200, objectFit: 'cover' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 2 }}>
        <Typography variant="h6" color="primary">
          Beachfront Resort, Cox's Bazar
        </Typography>
        <Typography variant="body2">2 km from Cox's Bazar center</Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#008009', color: 'white', display: 'inline', p: 0.5, borderRadius: 1 }}>
          Free shuttle to the beach
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Ocean-view Luxury Room with A/C
        </Typography>
        <Typography variant="body2">Ocean view • 1 bedroom • 25m² 1 king-size bed</Typography>
        <Typography variant="body2" sx={{ color: '#008009', fontWeight: 'bold' }}>
          Free cancellation
        </Typography>
        <Typography variant="body2" sx={{ color: '#008009' }}>
          You can cancel later, so lock in this great price today!
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Excellent
          </Typography>
          <Rating value={9.2} readOnly precision={0.1} />
        </Box>
        <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            ৳8,000
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Includes taxes and fees
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0071c2',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 1,
              padding: '10px 5px',
            }}
          >
            See availability
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchItem;
