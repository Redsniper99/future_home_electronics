'use client';

import React, { useState, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Button,
    Paper,
    Slider,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Search, Clear, FilterList, Close } from '@mui/icons-material';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products';
import { useSearchParams } from 'next/navigation';

const categories = ['All', 'Gaming', 'Smart Home', 'Power & Plugs', 'Audio', 'Accessories'];

function ProductsContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'All');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const filterType = searchParams?.get('filter'); // Get filter parameter

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by deals (products with discounts)
        if (filterType === 'deals') {
            filtered = filtered.filter((p) => p.oldPrice);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return filtered;
    }, [searchQuery, selectedCategory, sortBy, priceRange, filterType]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setPriceRange([0, 20000]);
        setSortBy('featured');
    };

    const FilterContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Filters
                </Typography>
                <IconButton
                    onClick={() => setMobileOpen(false)}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <Close />
                </IconButton>
            </Box>

            {/* Search */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Search
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
                    }}
                />
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Categories
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            onClick={() => setSelectedCategory(category)}
                            color={selectedCategory === category ? 'primary' : 'default'}
                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                            sx={{
                                justifyContent: 'flex-start',
                                fontSize: '0.875rem',
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Price Range
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={20000}
                    step={500}
                    size="small"
                />
            </Box>

            {/* Clear Filters */}
            <Button
                fullWidth
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClearFilters}
            >
                Clear All
            </Button>
        </Box>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
                Shop All Products
            </Typography>

            {/* Main Layout: Sidebar + Products */}
            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Sidebar Filters */}
                {/* Sidebar Filters (Desktop) */}
                <Paper
                    sx={{
                        width: { xs: '100%', md: 280 },
                        display: { xs: 'none', md: 'block' },
                        p: 3,
                        height: 'fit-content',
                        position: 'sticky',
                        top: 100,
                    }}
                >
                    {FilterContent}
                </Paper>

                {/* Mobile Filter Drawer */}
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        zIndex: 1400, // Ensure it's on top of Navbar
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280,
                            p: 3
                        },
                    }}
                >
                    {FilterContent}
                </Drawer>

                {/* Products Section */}
                <Box sx={{ flex: 1 }}>
                    {/* Mobile Filters Bar */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexDirection: 'column',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        {/* Row 1: Search */}
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                        />

                        {/* Row 2: Filters & Sort */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<FilterList />}
                                onClick={() => setMobileOpen(true)}
                                sx={{ flex: 1, height: 40 }}
                            >
                                Filters
                            </Button>
                            <FormControl size="small" sx={{ flex: 1 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    label="Sort By"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="price-low">Price: Low</MenuItem>
                                    <MenuItem value="price-high">Price: High</MenuItem>
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Top Bar: Results Count & Sort */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </Typography>
                        <FormControl sx={{ minWidth: 200, display: { xs: 'none', md: 'flex' } }} size="small">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="featured">Featured</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                                <MenuItem value="name">Name: A to Z</MenuItem>
                                <MenuItem value="rating">Rating: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
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
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                                No products found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Try adjusting your filters or search query
                            </Typography>
                            <Button variant="contained" onClick={handleClearFilters}>
                                Clear Filters
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default function ProductsPage() {
    return (
        <React.Suspense fallback={
            <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                <Typography>Loading products...</Typography>
            </Box>
        }>
            <ProductsContent />
        </React.Suspense>
    );
}
