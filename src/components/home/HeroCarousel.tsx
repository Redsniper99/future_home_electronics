'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, useTheme, alpha } from '@mui/material';
import { ArrowForward, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: 'Level Up Your Game',
        subtitle: 'Premium Gaming Gear & Accessories',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
        link: '/products?category=Gaming',
        cta: 'Shop Gaming',
        themeColor: 'primary',
    },
    {
        id: 2,
        title: 'Smart Living Defined',
        subtitle: 'Automate Your Home Today',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
        link: '/products?category=Smart%20Home',
        cta: 'Explore Smart Home',
        themeColor: 'success',
    },
    {
        id: 3,
        title: 'Immersive Audio',
        subtitle: 'Experience Sound Like Never Before',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
        link: '/products?category=Audio',
        cta: 'Discover Audio',
        themeColor: 'secondary',
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const getSlideColor = (themeColor: string) => {
        switch (themeColor) {
            case 'success':
                return theme.palette.success.dark;
            case 'secondary':
                return theme.palette.secondary.main;
            default:
                return theme.palette.primary.main;
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: 400, md: 500 },
                width: '100%',
                borderRadius: { xs: '10px', md: 4 },
                overflow: 'hidden',
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
            }}
        >
            {slides.map((slide, index) => {
                const color = getSlideColor(slide.themeColor);

                return (
                    <Box
                        key={slide.id}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                p: { xs: 4, md: 6 },
                                color: 'white',
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 1,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                                }}
                            >
                                {slide.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    fontWeight: 400,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    maxWidth: 400,
                                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                                }}
                            >
                                {slide.subtitle}
                            </Typography>
                            <Box
                                sx={{
                                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
                                }}
                            >
                                <Button
                                    component={Link}
                                    href={slide.link}
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        bgcolor: color,
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            bgcolor: alpha(color, 0.9),
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {slide.cta}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                );
            })}

            {/* Navigation arrows */}
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
                    zIndex: 3,
                }}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
                    zIndex: 3,
                }}
            >
                <KeyboardArrowRight />
            </IconButton>

            {/* Dots */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 3,
                }}
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': { bgcolor: 'white' },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
