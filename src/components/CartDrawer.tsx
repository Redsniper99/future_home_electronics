'use client';

import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString()}`;
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    maxWidth: '100%',
                },
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Shopping Cart ({cart.length})
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>

                {/* Cart Items */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    {cart.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                gap: 2,
                            }}
                        >
                            <Typography variant="h6" color="text.secondary">
                                Your cart is empty
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={onClose}
                                component={Link}
                                href="/products"
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {cart.map((item) => (
                                <Card
                                    key={item.id}
                                    sx={{
                                        display: 'flex',
                                        position: 'relative',
                                        boxShadow: 1,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            boxShadow: 3,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            objectFit: 'cover',
                                        }}
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{ flex: 1, p: 1.5, '&:last-child': { pb: 1.5 } }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 0.5,
                                                pr: 3,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                                            {formatPrice(item.price)}
                                        </Typography>

                                        {/* Quantity Controls */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 1,
                                                    width: 28,
                                                    height: 28,
                                                }}
                                            >
                                                <Remove fontSize="small" />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 1,
                                                    width: 28,
                                                    height: 28,
                                                }}
                                            >
                                                <Add fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>

                                    {/* Delete Button */}
                                    <IconButton
                                        size="small"
                                        onClick={() => removeFromCart(item.id)}
                                        sx={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            color: 'error.main',
                                        }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Footer */}
                {cart.length > 0 && (
                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Subtotal:
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                {formatPrice(getCartTotal())}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                            Shipping and taxes calculated at checkout
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            component={Link}
                            href="/cart"
                            onClick={onClose}
                            sx={{ mb: 1 }}
                        >
                            View Cart
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            onClick={onClose}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}
