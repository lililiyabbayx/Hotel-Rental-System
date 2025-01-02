import { Box } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;