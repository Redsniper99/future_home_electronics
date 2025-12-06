'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../ProductCard';
import products from '@/data/products';

export default function FeaturedProducts() {
    // Get first 12 products
    const featuredProducts = products.slice(0, 12);

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: 'background.paper' }}>
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
                        Top Picks
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.75rem' },
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Featured Products
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Discover our handpicked selection of premium electronics and accessories
                    </Typography>
                </Box>

                {/* Products Grid */}
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
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
