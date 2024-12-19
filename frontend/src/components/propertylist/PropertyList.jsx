import React from 'react';
import { Box, Typography } from '@mui/material';

const propertyListData = [
  {
    image:
      'https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720',
    title: 'Hotels',
    subtitle: '100 hotels',
  },
  {
    image:
      'https://jcxbd.com/wp-content/uploads/2024/08/View-02-877x1024.webp',
    title: 'Apartments',
    subtitle: '300 hotels',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_S3y0vGqiUBJ1snuKtozzkTrjbGCpurdApA&s',
    title: 'Resorts',
    subtitle: '80 hotels',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd61F3sX-EoYbmOCFBIrBQuSby80fld2T1aA&s',
    title: 'Villas',
    subtitle: '90 hotels',
  },
  {
    image:
      'https://imgservice.cabinns.com/webp/500x245/AzRT8xsWDLcIb870djrKFRX11IQf69xPiyIzIO_JKLa4SGWLX6PPCJdsWfg0NBbgoFZbCW8MKjPr-PYvHmCLgTk_IYo94lJZRtoemkrA3pU7japlfNMyV50lT0U6PwvXZqlcIo-jkCSOTVkGusvRMDMYHJSyjJWkNeNbuhvlYg==?property_id=HA-61111672780',
    title: 'Cabins',
    subtitle: '200 hotels',
  },
];

const PropertyList = () => {
  return (
    <Box padding={2} >

        <Typography textAlign="center" variant="h4" component="h1">
    Browse by property type
  </Typography>
    <Box padding={2}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        width: '100%',
        maxWidth: '1024px',
        margin: '0 auto',
      }}
    >
        

      {propertyListData.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            borderRadius: '10px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              padding: '10px',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h6" sx={{ color: '#444' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
              {item.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>

  );
};

export default PropertyList;
