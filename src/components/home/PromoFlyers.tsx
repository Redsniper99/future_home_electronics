'use client';

import React from 'react';
import { Box, Container, Typography, Button, useTheme, alpha } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

export default function PromoFlyers() {
    const theme = useTheme();

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg">
                {/* 1. Full Width Strip Banner */}
                <Box
                    component={Link}
                    href="/products?filter=deals"
                    sx={{
                        display: 'block',
                        textDecoration: 'none',
                        position: 'relative',
                        width: '100%',
                        borderRadius: { xs: '10px', md: 4 },
                        overflow: 'hidden',
                        mb: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/strip banner.png"
                        alt="Promo Strip Banner"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </Box>

                {/* 2. Row with 3/5 and 2/5 banners */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
                        gap: 3,
                        height: { xs: 'auto', md: 300 },
                    }}
                >
                    {/* 3/5 Banner */}
                    <Box
                        component={Link}
                        href="/products?category=Smart%20Home"
                        sx={{
                            position: 'relative',
                            textDecoration: 'none',
                            borderRadius: { xs: '10px', md: 4 },
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            height: { xs: 200, md: '100%' },
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                p: 4,
                            }}
                        >
                            <Typography variant="overline" sx={{ color: '#4ECDC4', fontWeight: 700, letterSpacing: 1 }}>
                                NEW ARRIVALS
                            </Typography>
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 1, maxWidth: 300 }}>
                                Next Gen Smart Living
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                endIcon={<ArrowForward />}
                                sx={{
                                    width: 'fit-content',
                                    bgcolor: 'white',
                                    color: 'text.primary',
                                    '&:hover': { bgcolor: 'grey.100' },
                                }}
                            >
                                Shop Details
                            </Button>
                        </Box>
                    </Box>

                    {/* 2/5 Banner */}
                    <Box
                        component={Link}
                        href="/products?category=Audio"
                        sx={{
                            position: 'relative',
                            textDecoration: 'none',
                            borderRadius: { xs: '10px', md: 4 },
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            height: { xs: 200, md: '100%' },
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                p: 4,
                            }}
                        >
                            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                Premium Audio
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                                Studio quality sound for less
                            </Typography>
                            <Typography variant="button" sx={{ color: theme.palette.secondary.light, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                                BUY NOW <ArrowForward fontSize="small" />
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
