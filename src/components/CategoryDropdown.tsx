'use client';

import React from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    alpha,
    Fade,
} from '@mui/material';
import {
    SportsEsports,
    Home,
    Headphones,
    Power,
    ChevronRight,
} from '@mui/icons-material';
import Link from 'next/link';

interface CategoryDropdownProps {
    open: boolean;
    onClose: () => void;
}

const categories = [
    {
        name: 'Gaming',
        icon: SportsEsports,
        color: '#E91E63',
        subcategories: [
            { label: 'Gaming Keyboards', href: '/products?search=Gaming%20Keyboard' },
            { label: 'Gaming Mice', href: '/products?search=Gaming%20Mouse' },
            { label: 'Gaming Headsets', href: '/products?search=Gaming%20Headset' },
            { label: 'Gaming Accessories', href: '/products?category=Gaming' },
        ],
    },
    {
        name: 'Smart Home',
        icon: Home,
        color: '#2196F3',
        subcategories: [
            { label: 'Smart Plugs', href: '/products?search=Smart%20Plug' },
            { label: 'Smart Cameras', href: '/products?search=Camera' },
            { label: 'Smart Lights', href: '/products?search=Light' },
            { label: 'Home Security', href: '/products?category=Smart%20Home' },
        ],
    },
    {
        name: 'Audio',
        icon: Headphones,
        color: '#FF9800',
        subcategories: [
            { label: 'Headphones', href: '/products?search=Headphone' },
            { label: 'Speakers', href: '/products?search=Speaker' },
            { label: 'Earbuds', href: '/products?search=Earbud' },
            { label: 'Audio Accessories', href: '/products?category=Audio' },
        ],
    },
    {
        name: 'Power & Accessories',
        icon: Power,
        color: '#4CAF50',
        subcategories: [
            { label: 'Power Strips', href: '/products?search=Power%20Strip' },
            { label: 'Extension Cords', href: '/products?search=Extension%20Cord' },
            { label: 'USB Cables', href: '/products?search=USB%20Cable' },
            { label: 'Adapters', href: '/products?category=Power%20%26%20Plugs' },
        ],
    },
];

export default function CategoryDropdown({ open, onClose }: CategoryDropdownProps) {
    if (!open) return null;

    return (
        <Fade in={open}>
            <Paper
                elevation={8}
                onMouseLeave={onClose}
                sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    mt: 1,
                    width: { xs: '100vw', md: 600 },
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: { xs: 0, md: 3 },
                    zIndex: 9999,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                }}
            >
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography
                        variant="overline"
                        sx={{
                            display: 'block',
                            color: 'text.secondary',
                            fontWeight: 600,
                            mb: 2,
                            fontSize: { xs: '0.7rem', md: '0.75rem' },
                        }}
                    >
                        Browse by Category
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: { xs: 2, md: 3 },
                        }}
                    >
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <Box key={category.name}>
                                    {/* Category Header */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            mb: 1.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 2,
                                                backgroundColor: alpha(category.color, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <IconComponent sx={{ color: category.color, fontSize: 24 }} />
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                    </Box>

                                    {/* Subcategories */}
                                    <List disablePadding>
                                        {category.subcategories.map((sub) => (
                                            <ListItemButton
                                                key={sub.label}
                                                component={Link}
                                                href={sub.href}
                                                onClick={onClose}
                                                sx={{
                                                    borderRadius: 1.5,
                                                    mb: 0.5,
                                                    py: 1,
                                                    px: 1.5,
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: alpha(category.color, 0.08),
                                                        transform: 'translateX(4px)',
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={sub.label}
                                                    primaryTypographyProps={{
                                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                                        fontWeight: 500,
                                                    }}
                                                />
                                                <ChevronRight sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Paper>
        </Fade>
    );
}
