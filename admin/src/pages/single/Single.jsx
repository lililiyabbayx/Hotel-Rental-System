import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";


const Single = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <Box sx={{ flex: 6, padding: 2 }}>
        <Typography>
          view data needs to be added
        </Typography>

      </Box>
    </Box>
  );
};

export default Single;
