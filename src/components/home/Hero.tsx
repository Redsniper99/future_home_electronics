'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        desktop: '/main-banner-desktop.png',
        mobile: '/main-banner-mobile.png',
        link: '/products',
    },
    {
        id: 2,
        desktop: '/main-banner-desktop_02.png',
        mobile: '/main-banner-mobile_02.png',
        link: '/products',
    },
    {
        id: 3,
        desktop: '/main-banner-desktop_03.png',
        mobile: '/main-banner-mobile_03.png',
        link: '/products',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                    overflow: 'hidden',
                    borderRadius: { xs: '10px', md: 6 },
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
            >
                {/* Slides Container */}
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.6s ease-in-out',
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide) => (
                        <Box
                            key={slide.id}
                            component={Link}
                            href={slide.link}
                            sx={{
                                flex: '0 0 100%',
                                width: '100%',
                                display: 'block',
                                textDecoration: 'none',
                            }}
                        >
                            {/* Desktop Banner */}
                            <Box
                                component="img"
                                src={slide.desktop}
                                alt={`Banner ${slide.id}`}
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '1920 / 792',
                                    objectFit: 'cover',
                                }}
                            />

                            {/* Mobile Banner */}
                            <Box
                                component="img"
                                src={slide.mobile}
                                alt={`Banner ${slide.id}`}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Navigation Arrows */}
                <IconButton
                    onClick={() => handleManualNavigation('prev')}
                    aria-label="Previous slide"
                    sx={{
                        position: 'absolute',
                        left: { xs: 8, md: 24 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.8)',
                        color: 'text.primary',
                        width: { xs: 36, md: 48 },
                        height: { xs: 36, md: 48 },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        '&:hover': {
                            bgcolor: 'white',
                        },
                        zIndex: 3,
                    }}
                >
                    <KeyboardArrowLeft sx={{ fontSize: { xs: 24, md: 32 } }} />
                </IconButton>
                <IconButton
                    onClick={() => handleManualNavigation('next')}
                    aria-label="Next slide"
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 24 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.8)',
                        color: 'text.primary',
                        width: { xs: 36, md: 48 },
                        height: { xs: 36, md: 48 },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        '&:hover': {
                            bgcolor: 'white',
                        },
                        zIndex: 3,
                    }}
                >
                    <KeyboardArrowRight sx={{ fontSize: { xs: 24, md: 32 } }} />
                </IconButton>

                {/* Dot Indicators */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 12, md: 24 },
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
                                width: index === currentSlide ? 28 : 10,
                                height: 10,
                                borderRadius: 5,
                                bgcolor: index === currentSlide ? 'primary.main' : 'rgba(0,0,0,0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: index === currentSlide ? 'primary.main' : 'rgba(0,0,0,0.5)',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
