'use client';

import React from 'react';
import { Box, Container, Typography, alpha, useTheme } from '@mui/material';

const brands = [
    'Voltix',
    'TechNova',
    'SoundWave',
    'PowerMax',
    'SmartLink',
    'PixelPro',
    'EchoTech',
    'CoreLogic',
];

export default function BrandStrip() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: { xs: 3, md: 6 },
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="overline"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        mb: { xs: 2, md: 4 },
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                    }}
                >
                    Trusted Brands We Carry
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 1.5, sm: 2, md: 3 },
                        justifyItems: 'center',
                    }}
                >
                    {brands.map((brand, index) => (
                        <Box
                            key={index}
                            sx={{
                                px: { xs: 1, md: 3 },
                                py: { xs: 1, md: 2 },
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '0.85rem', sm: '1rem', md: '1.3rem' },
                                    color: alpha(theme.palette.text.primary, 0.4),
                                    transition: 'all 0.3s ease',
                                    letterSpacing: '0.05em',
                                    textAlign: 'center',
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            >
                                {brand}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
