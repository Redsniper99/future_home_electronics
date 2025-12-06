'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, useTheme, alpha } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

const categories = [
    {
        name: 'Gaming Gear',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        link: '/products?category=Gaming',
        description: 'Elite performance',
    },
    {
        name: 'Smart Home',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        link: '/products?category=Smart%20Home',
        description: 'Connected living',
    },
    {
        name: 'Power & Plugs',
        image: 'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?auto=format&fit=crop&w=800&q=80',
        link: '/products?category=Power%20%26%20Plugs',
        description: 'Surge protection',
    },
    {
        name: 'Audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        link: '/products?category=Audio',
        description: 'Premium sound',
    },
    {
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        link: '/products?category=Accessories',
        description: 'Daily essentials',
    },
];

export default function FeaturedCategories() {
    const theme = useTheme();

    return (
        <Box sx={{ py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            mb: 1,
                            display: 'block',
                        }}
                    >
                        Browse by Category
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.75rem' },
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Shop Your Favorites
                    </Typography>
                </Box>

                {/* Categories Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(5, 1fr)',
                        },
                        gap: { xs: 1.5, sm: 2, md: 2.5 },
                    }}
                >
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            component={Link}
                            href={category.link}
                            sx={{
                                textDecoration: 'none',
                                position: 'relative',
                                height: { xs: 180, sm: 240, md: 280 },
                                borderRadius: { xs: '10px', md: 4 },
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                                    '& .bg-image': {
                                        transform: 'scale(1.1)',
                                    },
                                    '& .arrow-icon': {
                                        opacity: 1,
                                        transform: 'translateX(0)',
                                    }
                                },
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                className="bg-image"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${category.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                                }}
                            />

                            {/* Content */}
                            <CardContent
                                sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    p: 3,
                                    color: 'white',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 0.5,
                                        fontSize: '1.25rem',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {category.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            opacity: 0.9,
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                    <ArrowForward
                                        className="arrow-icon"
                                        sx={{
                                            fontSize: 20,
                                            opacity: 0,
                                            transform: 'translateX(-10px)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
