'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { ShoppingCart } from '@mui/icons-material';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveAllToCart = () => {
        wishlist.forEach((product) => addToCart(product));
    };

    if (wishlist.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Your Wishlist is Empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Save your favorite products to view them later
                </Typography>
                <Button variant="contained" component={Link} href="/products" size="large">
                    Browse Products
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    My Wishlist ({wishlist.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={handleMoveAllToCart}
                >
                    Add All to Cart
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: { xs: 1.5, sm: 2, md: 3 },
                }}
            >
                {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>
        </Container>
    );
}
