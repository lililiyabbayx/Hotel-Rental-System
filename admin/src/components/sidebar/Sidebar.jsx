import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240, // Adjusted width to make the sidebar smaller
        borderRight: "1px solid #e6e3e3",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e6e3e3",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#6439ff" }}
          >
            Admin Panel
          </Typography>
        </Link>
      </Box>
      <Divider />
      <Box sx={{ paddingLeft: 2 }}>
        <List>
          <Typography variant="caption" color="textSecondary">
            MAIN
          </Typography>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#7451f8" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
            LISTS
          </Typography>
          <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon sx={{ color: "#7451f8" }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StoreIcon sx={{ color: "#7451f8" }} />
                </ListItemIcon>
                <ListItemText primary="Hotels" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreditCardIcon sx={{ color: "#7451f8" }} />
                </ListItemIcon>
                <ListItemText primary="Rooms" />
              </ListItemButton>
            </ListItem>
          </Link>
          

          

          <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
            USER
          </Typography>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlinedIcon sx={{ color: "#7451f8" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: "#7451f8" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
