import React from 'react';
import { Box, Typography } from '@mui/material';
import useFetch from '../../hooks/useFetch';
const images = [
  'https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720',
'https://jcxbd.com/wp-content/uploads/2024/08/View-02-877x1024.webp',
 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_S3y0vGqiUBJ1snuKtozzkTrjbGCpurdApA&s',
 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd61F3sX-EoYbmOCFBIrBQuSby80fld2T1aA&s',
 
      'https://imgservice.cabinns.com/webp/500x245/AzRT8xsWDLcIb870djrKFRX11IQf69xPiyIzIO_JKLa4SGWLX6PPCJdsWfg0NBbgoFZbCW8MKjPr-PYvHmCLgTk_IYo94lJZRtoemkrA3pU7japlfNMyV50lT0U6PwvXZqlcIo-jkCSOTVkGusvRMDMYHJSyjJWkNeNbuhvlYg==?property_id=HA-61111672780',
  ];
  const PropertyList = () => {
    const { data, loading, error } = useFetch('http://localhost:5500/api/hotels/countByType');
  
    if (loading) {
      return <Typography textAlign="center">Loading...</Typography>;
    }
  
    if (error) {
      return <Typography textAlign="center">Error fetching data.</Typography>;
    }
  
    return (
      <Box padding={2}>
        <Typography textAlign="center" variant="h4" component="h1">
          Browse by property type
        </Typography>
        <Box
          padding={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            width: '100%',
            maxWidth: '1024px',
            margin: '0 auto',
          }}
        >
          {data &&
            data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  borderRadius: '5px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                <img
                  src={images[index]}
                  alt={item.type}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <Box
                  sx={{
                    padding: '10px',
                    backgroundColor: 'white',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#444' }}>
                    {item.type}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 300 }}>
                    {item.count} {item.type}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    );
  };
  
  export default PropertyList;
