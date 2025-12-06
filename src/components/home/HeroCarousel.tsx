'use client';

import React from 'react';
import { Box, useTheme, alpha, useMediaQuery } from '@mui/material';
import Link from 'next/link';

export default function HeroCarousel() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component={Link}
            href="/products"
            sx={{
                display: 'block',
                position: 'relative',
                height: { xs: 'auto', md: 'auto' },
                width: '100%',
                borderRadius: { xs: '10px', md: 4 },
                overflow: 'hidden',
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.15)}`,
                },
            }}
        >
            {/* Desktop Banner */}
            <Box
                component="img"
                src="/main-banner-desktop.png"
                alt="FutureHome Electronics"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                }}
            />

            {/* Mobile Banner */}
            <Box
                component="img"
                src="/main-banner-mobile.png"
                alt="FutureHome Electronics"
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                }}
            />
        </Box>
    );
}
