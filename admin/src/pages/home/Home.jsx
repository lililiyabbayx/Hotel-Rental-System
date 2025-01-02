import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";


const Home = () => {
  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={6}>
        {/* Navbar */}
        <Typography >contenr</Typography>

        {/* Widgets Section */}
        <Box
          display="flex"
          gap={2}
          p={2}
        >
         <Typography variant="h6" sx={{ fontWeight: "500", color: "gray", mb: 2 }}>
            none
          </Typography>
        </Box>

        
      </Box>
    </Box>
  );
};

export default Home;
