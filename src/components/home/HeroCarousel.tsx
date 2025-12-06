'use client';

import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import Image from 'next/image';

export default function HeroCarousel() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                borderRadius: { xs: '10px', md: 4 },
                overflow: 'hidden',
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                bgcolor: 'background.paper', // Fallback
            }}
        >
            {/* Desktop Banner */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', width: '100%', aspectRatio: '16/5' }}>
                <Image
                    src="/main-banner-desktop.png"
                    alt="FutureHome Electronics"
                    fill
                    priority
                    quality={100}
                    style={{ objectFit: 'cover' }}
                />
            </Box>

            {/* Mobile Banner */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'relative', width: '100%', aspectRatio: '4/4' }}>
                <Image
                    src="/main-banner-mobile.png"
                    alt="FutureHome Electronics"
                    fill
                    priority
                    quality={100}
                    style={{ objectFit: 'cover' }}
                />
            </Box>
        </Box>
    );
}
