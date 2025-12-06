'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Chip, Button, alpha, useTheme } from '@mui/material';
import { AccessTime, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';
import products from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function DealsSection() {
    const theme = useTheme();
    const { addToCart } = useCart();

    // Get products with discounts
    const dealProducts = products.filter((p) => p.oldPrice).slice(0, 4);

    // Countdown timer state (fake countdown for visual effect)
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 45,
        seconds: 30,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                        }
                    }
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString()}`;
    };

    const getDiscount = (price: number, oldPrice: number) => {
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    };

    return (
        <Box
            sx={{
                py: { xs: 8, md: 10 },
                background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        icon={<AccessTime />}
                        label="Limited Time Offer"
                        color="error"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            py: 2.5,
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.75rem' },
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Hot Deals This Week
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        Don't miss out on these incredible offers. Limited stock available!
                    </Typography>

                    {/* Countdown Timer */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { label: 'Hours', value: timeLeft.hours },
                            { label: 'Minutes', value: timeLeft.minutes },
                            { label: 'Seconds', value: timeLeft.seconds },
                        ].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: 'error.main',
                                    color: 'white',
                                    borderRadius: 2,
                                    p: 2,
                                    minWidth: 80,
                                    textAlign: 'center',
                                    boxShadow: `0 4px 16px ${alpha(theme.palette.error.main, 0.3)}`,
                                }}
                            >
                                <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
                                    {item.value.toString().padStart(2, '0')}
                                </Typography>
                                <Typography variant="caption" sx={{ textTransform: 'uppercase', opacity: 0.9 }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Deals Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 1.5, sm: 2, md: 3 },
                    }}
                >
                    {dealProducts.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 12px 32px ${alpha(theme.palette.error.main, 0.2)}`,
                                },
                            }}
                        >
                            {/* Discount Badge */}
                            <Chip
                                label={`-${getDiscount(product.price, product.oldPrice!)}%`}
                                color="error"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 4, md: 8 },
                                    left: { xs: 4, md: 8 },
                                    zIndex: 1,
                                    fontWeight: 700,
                                    fontSize: { xs: '0.75rem', md: '1rem' },
                                    height: { xs: 20, md: 24 },
                                }}
                            />

                            {/* Product Image */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    objectFit: 'cover',
                                    height: { xs: 140, sm: 160, md: 200 },
                                }}
                            />

                            {/* Product Details */}
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 1, sm: 1.5, md: 2 } }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        mb: { xs: 0.5, md: 1 },
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        minHeight: { xs: 32, md: 40 },
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        mb: { xs: 1, md: 2 },
                                        display: { xs: 'none', sm: 'block' },
                                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                                    }}
                                >
                                    {product.shortDescription}
                                </Typography>

                                {/* Price */}
                                <Box sx={{ mt: 'auto' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, mb: { xs: 1, md: 2 } }}>
                                        <Typography
                                            variant="h6"
                                            color="error"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: '0.9rem', md: '1.25rem' },
                                            }}
                                        >
                                            {formatPrice(product.price)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                textDecoration: 'line-through',
                                                fontSize: { xs: '0.7rem', md: '0.875rem' },
                                            }}
                                        >
                                            {formatPrice(product.oldPrice!)}
                                        </Typography>
                                    </Box>

                                    {/* Easy Pay Options */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: { xs: 0.5, md: 1 } }}>
                                        {/* KOKO */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                component="img"
                                                src="/products/koko.png"
                                                alt="KOKO"
                                                sx={{
                                                    height: { xs: 14, md: 18 },
                                                    width: 'auto',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: { xs: '0.65rem', md: '0.75rem' },
                                                    lineHeight: 1,
                                                    fontWeight: 500
                                                }}
                                            >
                                                {formatPrice(Math.round(product.price / 3))}/mo
                                            </Typography>
                                        </Box>

                                        {/* Mint */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                component="img"
                                                src="/products/mint.png"
                                                alt="Mint"
                                                sx={{
                                                    height: { xs: 18, md: 24 },
                                                    width: 'auto',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: { xs: '0.65rem', md: '0.75rem' },
                                                    lineHeight: 1,
                                                    fontWeight: 500
                                                }}
                                            >
                                                {formatPrice(Math.round(product.price / 6))}/mo
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Add to Cart Button */}
                                    <Button
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                        size="small"
                                        startIcon={<ShoppingCart sx={{ fontSize: { xs: 16, md: 20 } }} />}
                                        onClick={() => addToCart(product)}
                                        sx={{
                                            py: { xs: 0.5, md: 0.75 },
                                            fontSize: { xs: '0.7rem', md: '0.875rem' },
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* View All Deals Button */}
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        component={Link}
                        href="/products?filter=deals"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2,
                            },
                        }}
                    >
                        View All Deals
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
