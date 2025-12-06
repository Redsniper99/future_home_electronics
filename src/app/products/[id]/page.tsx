'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    Button,
    Rating,
    Chip,
    IconButton,
    Breadcrumbs,
    Link as MuiLink,
    alpha,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Divider,
    Grid,
} from '@mui/material';
import {
    ShoppingCart,
    FavoriteBorder,
    Favorite,
    ArrowBack,
    LocalShipping,
    CachedOutlined,
    VerifiedUser,
    CreditCard,
    AccountBalance,
    CheckCircle,
} from '@mui/icons-material';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [selectedImage, setSelectedImage] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Product ID is a string in the data
    const productId = params?.id as string;
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Product Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    The product you're looking for doesn't exist or has been removed.
                </Typography>
                <Button variant="contained" component={Link} href="/products" sx={{ mt: 2 }}>
                    Browse Products
                </Button>
            </Container>
        );
    }

    const isInWishlist = wishlist.some((item) => item.id === product.id);
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
    const getDiscount = (current: number, old: number) => Math.round(((old - current) / old) * 100);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Back Button & Breadcrumbs - Inline on Mobile */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: { xs: 1, md: 2 },
                mb: 3
            }}>
                <Button
                    startIcon={<ArrowBack sx={{ fontSize: { xs: 16, md: 20 } }} />}
                    onClick={() => router.back()}
                    size="small"
                    sx={{
                        minWidth: 'auto',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        py: { xs: 0.5, md: 1 },
                        px: { xs: 1, md: 2 },
                    }}
                >
                    Back
                </Button>

                {/* Breadcrumbs */}
                <Breadcrumbs
                    maxItems={4}
                    itemsAfterCollapse={2}
                    sx={{
                        fontSize: { xs: '0.7rem', md: '0.875rem' },
                        '& .MuiBreadcrumbs-separator': {
                            mx: { xs: 0.5, md: 1 },
                        },
                        '& .MuiBreadcrumbs-li': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: { xs: '80px', sm: '150px', md: 'none' }, // Limit width on mobile
                        },
                    }}
                >
                    <MuiLink
                        component={Link}
                        href="/"
                        underline="hover"
                        color="inherit"
                        sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                    >
                        Home
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href="/products"
                        underline="hover"
                        color="inherit"
                        sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                    >
                        Products
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={`/products?category=${product.category}`}
                        underline="hover"
                        color="inherit"
                        sx={{
                            fontSize: { xs: '0.7rem', md: '0.875rem' },
                        }}
                    >
                        {product.category}
                    </MuiLink>
                    <Typography
                        color="text.primary"
                        sx={{
                            fontSize: { xs: '0.7rem', md: '0.875rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Breadcrumbs>
            </Box>

            {/* Product Details */}
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Product Image Gallery */}
                <Box sx={{ flex: 1 }}>
                    {/* Main Image */}
                    <Box
                        component="img"
                        src={product.images?.[selectedImage] || product.image}
                        alt={product.name}
                        sx={{
                            width: '100%',
                            height: { xs: 300, md: 500 },
                            objectFit: 'cover',
                            borderRadius: { xs: '10px', md: 3 },
                            mb: 2,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    />

                    {/* Thumbnail Gallery */}
                    {product.images && product.images.length > 1 && (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >
                            {product.images.map((img, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={img}
                                    alt={`${product.name} - View ${index + 1}`}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        width: '100%',
                                        height: 80,
                                        objectFit: 'cover',
                                        borderRadius: { xs: '10px', md: 2 },
                                        cursor: 'pointer',
                                        border: '2px solid',
                                        borderColor: selectedImage === index ? 'primary.main' : 'divider',
                                        opacity: selectedImage === index ? 1 : 0.6,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            opacity: 1,
                                            borderColor: 'primary.main',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Product Info */}
                <Box sx={{ flex: 1 }}>
                    {/* Badge */}
                    {product.badge && (
                        <Chip
                            label={product.badge}
                            color="primary"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    )}

                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        {product.name}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Rating value={product.rating} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary">
                            ({product.rating}/5)
                        </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                            {formatPrice(product.price)}
                        </Typography>
                        {product.oldPrice && (
                            <>
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    sx={{ textDecoration: 'line-through' }}
                                >
                                    {formatPrice(product.oldPrice)}
                                </Typography>
                                <Chip
                                    label={`${getDiscount(product.price, product.oldPrice)}% OFF`}
                                    color="error"
                                    size="small"
                                />
                            </>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                        {product.description}
                    </Typography>

                    {/* Variants: Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Color
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                {product.colors.map((color, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedColor(index)}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            bgcolor: color,
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: selectedColor === index ? 'primary.main' : 'rgba(0,0,0,0.1)',
                                            boxShadow: selectedColor === index ? '0 0 0 2px white inset' : 'none',
                                            position: 'relative',
                                            transition: 'all 0.2s',
                                            '&:hover': { transform: 'scale(1.1)' },
                                            '&::after': selectedColor === index ? {
                                                content: '""',
                                                position: 'absolute',
                                                top: -4,
                                                left: -4,
                                                right: -4,
                                                bottom: -4,
                                                borderRadius: '50%',
                                                border: '1px solid',
                                                borderColor: 'primary.main'
                                            } : {}
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Variants: Sizes/Versions */}
                    {product.sizes && product.sizes.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Version / Size
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {product.sizes.map((size, index) => (
                                    <Button
                                        key={index}
                                        variant={selectedSize === index ? 'contained' : 'outlined'}
                                        onClick={() => setSelectedSize(index)}
                                        sx={{
                                            minWidth: 48,
                                            borderColor: selectedSize === index ? 'primary.main' : 'divider',
                                            color: selectedSize === index ? 'common.white' : 'text.primary',
                                            bgcolor: selectedSize === index ? 'primary.main' : 'transparent',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: selectedSize === index ? 'primary.dark' : 'action.hover',
                                            }
                                        }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                        {product.tags.map((tag) => (
                            <Chip key={tag} label={tag} variant="outlined" size="small" />
                        ))}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCart />}
                            onClick={handleAddToCart}
                            sx={{ flex: 1, py: 1.5 }}
                        >
                            Add to Cart
                        </Button>
                        <IconButton
                            onClick={handleToggleWishlist}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                width: 56,
                                '&:hover': {
                                    backgroundColor: alpha('#000', 0.04),
                                },
                            }}
                        >
                            {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
                        </IconButton>
                    </Box>

                    {/* Payment Options */}
                    <Paper variant="outlined" sx={{ p: 2.5, mb: 4, borderRadius: 3, bgcolor: alpha('#000', 0.01) }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CreditCard fontSize="small" color="primary" /> Payment Options
                        </Typography>

                        {/* KOKO */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box component="img" src="/products/koko.png" alt="KOKO" sx={{ height: 20, width: 'auto' }} />
                                <Typography variant="body2" fontWeight={500}>Koko Pay in 3</Typography>
                            </Box>
                            <Typography variant="body2" color="primary.main" fontWeight={600}>
                                {formatPrice(Math.round(product.price / 3))} x 3
                            </Typography>
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

                        {/* Mint */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box component="img" src="/products/mint.png" alt="Mint" sx={{ height: 26, width: 'auto' }} />
                                <Typography variant="body2" fontWeight={500}>Mint Pay in 6</Typography>
                            </Box>
                            <Typography variant="body2" color="primary.main" fontWeight={600}>
                                {formatPrice(Math.round(product.price / 6))} x 6
                            </Typography>
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

                        {/* Credit Card Installments */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block', fontWeight: 600 }}>
                                CREDIT CARD INSTALLMENTS
                            </Typography>

                            {/* ComBank */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box component="img" src="/combank.png" alt="ComBank" sx={{ height: 24, width: 'auto', objectFit: 'contain' }} />
                                    <Typography variant="body2" fontWeight={500}>ComBank</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" fontWeight={600}>{formatPrice(Math.round(product.price / 12))}</Typography>
                                    <Typography variant="caption" color="text.secondary">x 12 Months</Typography>
                                </Box>
                            </Box>

                            {/* Sampath */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box component="img" src="/sampath.png" alt="Sampath" sx={{ height: 24, width: 'auto', objectFit: 'contain' }} />
                                    <Typography variant="body2" fontWeight={500}>Sampath</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" fontWeight={600}>{formatPrice(Math.round((product.price * 1.025) / 12))}</Typography>
                                    <Typography variant="caption" color="text.secondary">x 12 Months</Typography>
                                </Box>
                            </Box>

                            {/* HNB */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box component="img" src="/hnb.png" alt="HNB" sx={{ height: 24, width: 'auto', objectFit: 'contain' }} />
                                    <Typography variant="body2" fontWeight={500}>HNB</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" fontWeight={600}>{formatPrice(Math.round((product.price * 1.05) / 24))}</Typography>
                                    <Typography variant="caption" color="text.secondary">x 24 Months</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

                        {/* Bank Transfer */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AccountBalance color="action" />
                                <Typography variant="body2" fontWeight={500}>Bank Transfer</Typography>
                            </Box>
                            <Chip size="small" label="Available" color="success" variant="outlined" />
                        </Box>
                    </Paper>

                    {/* Features Grid */}
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 4 }}>
                            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'grey.50', borderRadius: 2, height: '100%' }}>
                                <LocalShipping color="primary" sx={{ mb: 1, fontSize: 28 }} />
                                <Typography variant="caption" display="block" fontWeight={600}>Islandwide Delivery</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'grey.50', borderRadius: 2, height: '100%' }}>
                                <CachedOutlined color="primary" sx={{ mb: 1, fontSize: 28 }} />
                                <Typography variant="caption" display="block" fontWeight={600}>7 Day Returns</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'grey.50', borderRadius: 2, height: '100%' }}>
                                <VerifiedUser color="primary" sx={{ mb: 1, fontSize: 28 }} />
                                <Typography variant="caption" display="block" fontWeight={600}>1 Year Warranty</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Product Information Tabs */}
            <Box sx={{ mt: 6, mb: 8 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
                        <Tab label="Description" sx={{ fontWeight: 600 }} />
                        <Tab label="Specifications" sx={{ fontWeight: 600 }} />
                        <Tab label="Reviews" sx={{ fontWeight: 600 }} />
                    </Tabs>
                </Box>

                {/* Description Panel */}
                <Box role="tabpanel" hidden={tabValue !== 0} sx={{ py: 4 }}>
                    {tabValue === 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom fontWeight={600}>Product Description</Typography>
                            <Typography paragraph lineHeight={1.8} color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography paragraph lineHeight={1.8} color="text.secondary">
                                Cannot decide which product to choose? We are here to help you. Chat with live support or visit our store to get hands-on experience with the products. All our products are 100% genuine and come with a comprehensive warranty.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Specifications Panel */}
                <Box role="tabpanel" hidden={tabValue !== 1} sx={{ py: 4 }}>
                    {tabValue === 1 && (
                        <Box>
                            <Typography variant="h6" gutterBottom fontWeight={600}>Technical Specifications</Typography>
                            <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 800, borderRadius: 2 }}>
                                <Table>
                                    <TableBody>
                                        {product.specs ? (
                                            product.specs.map((spec, index) => (
                                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, width: '40%' }}>
                                                        {spec.label}
                                                    </TableCell>
                                                    <TableCell>{spec.value}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            product.tags.map((tag, index) => (
                                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, width: '40%' }}>
                                                        Feature {index + 1}
                                                    </TableCell>
                                                    <TableCell>{tag}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>Category</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Box>

                {/* Reviews Panel */}
                <Box role="tabpanel" hidden={tabValue !== 2} sx={{ py: 4 }}>
                    {tabValue === 2 && (
                        <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
                            <Rating value={product.rating} readOnly size="large" sx={{ mb: 2 }} />
                            <Typography color="text.secondary">
                                No written reviews yet. Be the first to review this product!
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                        Related Products
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                            gap: 3,
                        }}
                    >
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </Box>
                </Box>
            )}
        </Container>
    );
}
