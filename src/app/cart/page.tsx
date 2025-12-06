'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Button,
    Divider,
    Paper,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString()}`;
    };

    const shipping = cart.length > 0 ? 500 : 0;
    const total = getCartTotal() + shipping;

    if (cart.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Your Cart is Empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Looks like you haven't added any products yet
                </Typography>
                <Button variant="contained" component={Link} href="/products" size="large">
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
                Shopping Cart
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                {/* Cart Items */}
                <Box>
                    {cart.map((item) => (
                        <Card key={item.id} sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }}
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent sx={{ flex: 1, px: 3 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {item.category}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                    {formatPrice(item.price)}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        sx={{ border: '1px solid', borderColor: 'divider' }}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                                        {item.quantity}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        sx={{ border: '1px solid', borderColor: 'divider' }}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Box>
                                <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Card>
                    ))}
                    <Button variant="outlined" color="error" onClick={clearCart} sx={{ mt: 2 }}>
                        Clear Cart
                    </Button>
                </Box>

                {/* Order Summary */}
                <Paper sx={{ p: 3, height: 'fit-content', position: 'sticky', top: 100 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Order Summary
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Subtotal</Typography>
                            <Typography>{formatPrice(getCartTotal())}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Shipping</Typography>
                            <Typography>{formatPrice(shipping)}</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Total
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            {formatPrice(total)}
                        </Typography>
                    </Box>
                    <Button variant="contained" fullWidth size="large" sx={{ mb: 2 }}>
                        Proceed to Checkout
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        href="/products"
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
