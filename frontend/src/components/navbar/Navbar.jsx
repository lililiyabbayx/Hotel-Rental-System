import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Assuming you're using context for authentication

const drawerWidth = 240;

function Navbar(props) {
  const { user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <AcUnitIcon sx={{ fontSize: 50, color: 'primary.main', mt: 2 }} />
        <Typography variant="h6" sx={{ my: 2 }}>
          PATH way IN
        </Typography>
      </Link>
      <Divider />
      <List>
        {user ? (
          <ListItem disablePadding>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={`Welcome, ${user.username}`} />
              </ListItemButton>
            </Link>
          </ListItem>
        ) : (
          <>
            <ListItem key="register" disablePadding>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem key="login" disablePadding>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            <AcUnitIcon sx={{ fontSize: 50, color: 'white', mt: 2 }} />
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              PATH way IN
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user ? (
              <Typography variant="h6" sx={{ color: 'white' }}>
                Welcome, {user.username}
              </Typography>
            ) : (
              <div>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white' }}>Register</Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white' }}>Login</Button>
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
