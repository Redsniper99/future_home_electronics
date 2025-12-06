'use client';

import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Rating,
    IconButton,
    Button,
} from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString()}`;
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const getDiscount = (current: number, old: number) => {
        return Math.round(((old - current) / old) * 100);
    };

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(107, 186, 236, 0.2)',
                },
            }}
        >
            {/* Product Image */}
            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    />

                    {/* Wishlist Button */}
                    <IconButton
                        onClick={handleWishlistToggle}
                        sx={{
                            position: 'absolute',
                            top: { xs: 4, md: 8 },
                            right: { xs: 4, md: 8 },
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(8px)',
                            width: { xs: 28, md: 36 },
                            height: { xs: 28, md: 36 },
                            '&:hover': {
                                backgroundColor: 'white',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {inWishlist ? (
                            <Favorite sx={{ fontSize: { xs: 16, md: 20 }, color: 'error.main' }} />
                        ) : (
                            <FavoriteBorder sx={{ fontSize: { xs: 16, md: 20 } }} />
                        )}
                    </IconButton>

                    {/* Badge */}
                    {product.badge && (
                        <Chip
                            label={product.badge}
                            color="primary"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: { xs: 4, md: 8 },
                                left: { xs: 4, md: 8 },
                                fontWeight: 600,
                                fontSize: { xs: '0.65rem', md: '0.75rem' },
                                height: { xs: 20, md: 24 },
                            }}
                        />
                    )}

                    {/* Discount Badge */}
                    {product.oldPrice && (
                        <Chip
                            label={`-${getDiscount(product.price, product.oldPrice)}%`}
                            color="error"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: product.badge ? { xs: 28, md: 40 } : { xs: 4, md: 8 },
                                left: { xs: 4, md: 8 },
                                fontWeight: 600,
                                fontSize: { xs: '0.65rem', md: '0.75rem' },
                                height: { xs: 20, md: 24 },
                            }}
                        />
                    )}

                    {/* Hover Action Buttons (Desktop Only) */}
                    {isHovered && (
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                flexDirection: 'column',
                                gap: 1,
                                position: 'absolute',
                                bottom: 12,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<ShoppingCart sx={{ fontSize: 18 }} />}
                                onClick={handleAddToCart}
                                sx={{
                                    py: 1.25,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    )}
                </Box>
            </Link>

            {/* Product Details */}
            <CardContent sx={{ flexGrow: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
                <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontSize: { xs: '0.65rem', md: '0.75rem' },
                            display: 'block',
                            mb: { xs: 0.25, md: 0.5 },
                        }}
                    >
                        {product.category}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
                            mb: { xs: 0.5, md: 1 },
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: { xs: 32, md: 48 },
                            lineHeight: 1.3,
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {product.name}
                    </Typography>
                </Link>

                {/* Rating Removed */}
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: { xs: 0.5, md: 1 } }}>
                    <Rating ... />
                </Box> */}

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 0.5, md: 1 } }}>
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                        }}
                    >
                        {formatPrice(product.price)}
                    </Typography>
                    {product.oldPrice && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                textDecoration: 'line-through',
                                fontSize: { xs: '0.7rem', md: '0.875rem' },
                            }}
                        >
                            {formatPrice(product.oldPrice)}
                        </Typography>
                    )}
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

                {/* Mobile-only Add to Cart Button */}
                <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    startIcon={<ShoppingCart sx={{ fontSize: 16 }} />}
                    onClick={handleAddToCart}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        mt: 0.5,
                        py: 0.5,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}
