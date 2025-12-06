'use client';

import React from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
    alpha,
    useTheme,
} from '@mui/material';
import { Person, ShoppingBag, Settings, Logout } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';

interface UserMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
}

export default function UserMenu({ anchorEl, open, onClose }: UserMenuProps) {
    const { user, signOut } = useAuth();
    const theme = useTheme();

    const handleSignOut = () => {
        signOut();
        onClose();
    };

    if (!user) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    minWidth: 250,
                    borderRadius: 2,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                },
            }}
        >
            {/* User Info Header */}
            <Box sx={{ px: 2, py: 1.5, backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    {user.email}
                </Typography>
            </Box>

            <Divider />

            {/* Menu Items */}
            <MenuItem onClick={onClose}>
                <ListItemIcon>
                    <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
            </MenuItem>

            <MenuItem onClick={onClose}>
                <ListItemIcon>
                    <ShoppingBag fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Orders</ListItemText>
            </MenuItem>

            <MenuItem onClick={onClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleSignOut} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                    <Logout fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
            </MenuItem>
        </Menu>
    );
}
