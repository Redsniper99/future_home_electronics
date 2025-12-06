'use client';

import React, { useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Divider,
    Avatar,
    alpha,
    Fade,
} from '@mui/material';
import {
    TrendingUp,
    NewReleases,
    Search as SearchIcon,
    LocalFireDepartment,
} from '@mui/icons-material';
import Link from 'next/link';
import products from '@/data/products';

interface SearchDropdownProps {
    open: boolean;
    searchQuery: string;
    onClose: () => void;
    onSelect: (query: string) => void;
}

const popularSearches = [
    'Gaming Headset',
    'Smart Plug',
    'USB Cable',
    'Wireless',
    'RGB',
    'Power Strip',
];

export default function SearchDropdown({
    open,
    searchQuery,
    onClose,
    onSelect,
}: SearchDropdownProps) {
    // Get new arrivals (last 4 products by ID)
    const newArrivals = useMemo(() => {
        return [...products]
            .sort((a, b) => parseInt(b.id) - parseInt(a.id))
            .slice(0, 4);
    }, []);

    // Get trending (top rated)
    const trending = useMemo(() => {
        return [...products]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
    }, []);

    // Live search results
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return products
            .filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            )
            .slice(0, 6);
    }, [searchQuery]);

    if (!open) return null;

    const hasSearchQuery = searchQuery.trim().length > 0;

    return (
        <Fade in={open}>
            <Paper
                elevation={8}
                sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    p: 2,
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    zIndex: 9999,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                }}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
            >
                {hasSearchQuery ? (
                    // Live Search Results
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: 'text.secondary',
                                mb: 1.5,
                            }}
                        >
                            <SearchIcon fontSize="small" />
                            Search Results
                        </Typography>

                        {searchResults.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {searchResults.map((product) => (
                                    <Box
                                        key={product.id}
                                        component={Link}
                                        href={`/products/${product.id}`}
                                        onClick={onClose}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 1.5,
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.08),
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={product.image}
                                            variant="rounded"
                                            sx={{ width: 48, height: 48 }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                noWrap
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="primary"
                                                fontWeight={500}
                                            >
                                                Rs. {product.price.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}

                                <Box
                                    component={Link}
                                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                                    onClick={onClose}
                                    sx={{
                                        display: 'block',
                                        textAlign: 'center',
                                        py: 1.5,
                                        mt: 1,
                                        borderRadius: 2,
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        textDecoration: 'none',
                                        backgroundColor: (theme) =>
                                            alpha(theme.palette.primary.main, 0.08),
                                        '&:hover': {
                                            backgroundColor: (theme) =>
                                                alpha(theme.palette.primary.main, 0.15),
                                        },
                                    }}
                                >
                                    View all results for "{searchQuery}"
                                </Box>
                            </Box>
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ py: 3, textAlign: 'center' }}
                            >
                                No products found for "{searchQuery}"
                            </Typography>
                        )}
                    </Box>
                ) : (
                    // Default Suggestions View
                    <Box>
                        {/* Popular Searches */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    mb: 1.5,
                                }}
                            >
                                <LocalFireDepartment fontSize="small" color="warning" />
                                Popular Searches
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {popularSearches.map((term) => (
                                    <Chip
                                        key={term}
                                        label={term}
                                        size="small"
                                        onClick={() => onSelect(term)}
                                        sx={{
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.15),
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* New Arrivals */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    mb: 1.5,
                                }}
                            >
                                <NewReleases fontSize="small" color="success" />
                                New Arrivals
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 1,
                                }}
                            >
                                {newArrivals.map((product) => (
                                    <Box
                                        key={product.id}
                                        component={Link}
                                        href={`/products/${product.id}`}
                                        onClick={onClose}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            p: 1,
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.08),
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={product.image}
                                            variant="rounded"
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="caption"
                                                fontWeight={600}
                                                noWrap
                                                sx={{ display: 'block' }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="primary"
                                            >
                                                Rs. {product.price.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Trending */}
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    mb: 1.5,
                                }}
                            >
                                <TrendingUp fontSize="small" color="error" />
                                Trending Now
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 1,
                                }}
                            >
                                {trending.map((product) => (
                                    <Box
                                        key={product.id}
                                        component={Link}
                                        href={`/products/${product.id}`}
                                        onClick={onClose}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            p: 1,
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.08),
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={product.image}
                                            variant="rounded"
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="caption"
                                                fontWeight={600}
                                                noWrap
                                                sx={{ display: 'block' }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                ⭐ {product.rating}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Fade>
    );
}
