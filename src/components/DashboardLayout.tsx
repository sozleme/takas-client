import React from 'react';
import {
    Box,
    CssBaseline,
    Drawer,
    Toolbar,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Badge,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

type Props = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />


            {/* Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f9f9f9',
                        borderRight: '1px solid #ddd',
                    },
                }}
            >
                <Toolbar>
                    <Box sx={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
                        TAKAS
                    </Box>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton onClick={handleDashboard}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton onClick={() => console.log('offers')}>
                            <ListItemIcon>
                                <SwapHorizIcon />
                            </ListItemIcon>
                            <ListItemText primary="Offers" />
                            <Badge badgeContent={4} color="primary" />
                        </ListItemButton>
                        <ListItemButton onClick={() => console.log('new listing')}>
                            <ListItemIcon>
                                <AddCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Listing" />
                        </ListItemButton>
                        <ListItemButton onClick={() => console.log('my listings')}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Listings" />
                        </ListItemButton>
                        <ListItemButton onClick={handleProfile}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            {/* Content */}
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#fff', p: 3 }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
