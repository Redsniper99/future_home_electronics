'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, IconButton, useTheme, alpha } from '@mui/material';
import { ArrowForward, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: 'Premium Gaming Gear',
        subtitle: 'Level up your gaming experience with top-tier keyboards, mice, and headsets',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
        link: '/products?category=Gaming',
        cta: 'Shop Now',
    },
    {
        id: 2,
        title: 'Smart Home Essentials',
        subtitle: 'Automate your life with intelligent devices that make every day easier',
        image: 'https://images.unsplash.com/photo-1558002038-10914166ae5a?auto=format&fit=crop&w=1920&q=80',
        link: '/products?category=Smart%20Home',
        cta: 'Explore',
    },
    {
        id: 3,
        title: 'Audio Excellence',
        subtitle: 'Immerse yourself in crystal-clear sound with premium audio gear',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80',
        link: '/products?category=Audio',
        cta: 'Discover',
    },
    {
        id: 4,
        title: 'Power & Accessories',
        subtitle: 'Stay charged and connected with reliable power solutions',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1920&q=80',
        link: '/products?category=Power%20%26%20Plugs',
        cta: 'Shop Now',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const theme = useTheme();

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    const handleManualNavigation = (direction: 'prev' | 'next') => {
        setIsAutoPlaying(false);
        if (direction === 'prev') prevSlide();
        else nextSlide();
        // Resume autoplay after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleDotClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentSlide(index);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 4, md: 6 } }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: '400px', sm: '500px', md: '500px' },
                    overflow: 'hidden',
                    borderRadius: { xs: '10px', md: 6 },
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
            >
                {/* Slides */}
                {slides.map((slide, index) => (
                    <Box
                        key={slide.id}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            visibility: index === currentSlide ? 'visible' : 'hidden',
                            transition: 'opacity 0.7s ease-in-out, visibility 0.7s ease-in-out',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                            }}
                        />

                        {/* Content */}
                        <Container
                            maxWidth={false}
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                px: { xs: 3, md: 6 },
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: { xs: '100%', md: '60%' },
                                    color: 'white',
                                    transform: index === currentSlide ? 'translateX(0)' : 'translateX(-30px)',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                        mb: 2,
                                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {slide.title}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                                        mb: 4,
                                        opacity: 0.9,
                                        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                                        maxWidth: 500,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {slide.subtitle}
                                </Typography>
                                <Button
                                    component={Link}
                                    href={slide.link}
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        color: 'white',
                                        px: { xs: 3, md: 5 },
                                        py: { xs: 1.2, md: 1.5 },
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.dark,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
                                        },
                                    }}
                                >
                                    {slide.cta}
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                ))}

                {/* Navigation Arrows */}
                <IconButton
                    onClick={() => handleManualNavigation('prev')}
                    aria-label="Previous slide"
                    sx={{
                        position: 'absolute',
                        left: { xs: 8, md: 24 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(4px)',
                        color: 'white',
                        width: { xs: 40, md: 56 },
                        height: { xs: 40, md: 56 },
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.25)',
                        },
                        zIndex: 3,
                    }}
                >
                    <KeyboardArrowLeft sx={{ fontSize: { xs: 28, md: 36 } }} />
                </IconButton>
                <IconButton
                    onClick={() => handleManualNavigation('next')}
                    aria-label="Next slide"
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 24 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(4px)',
                        color: 'white',
                        width: { xs: 40, md: 56 },
                        height: { xs: 40, md: 56 },
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.25)',
                        },
                        zIndex: 3,
                    }}
                >
                    <KeyboardArrowRight sx={{ fontSize: { xs: 28, md: 36 } }} />
                </IconButton>

                {/* Dot Indicators */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 16, md: 32 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1.5,
                        zIndex: 3,
                    }}
                >
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => handleDotClick(index)}
                            sx={{
                                width: index === currentSlide ? 32 : 12,
                                height: 12,
                                borderRadius: 6,
                                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'white',
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Progress bar (optional subtle indicator) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: 3,
                        bgcolor: theme.palette.primary.main,
                        width: `${((currentSlide + 1) / slides.length) * 100}%`,
                        transition: 'width 0.5s ease-out',
                        zIndex: 3,
                    }}
                />
            </Box>
        </Container>
    );
}
